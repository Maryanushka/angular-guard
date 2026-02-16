import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap, mergeMap, concatMap } from 'rxjs/operators';
import { UserActions } from './user.actions';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, getDocs, doc, updateDoc, collectionGroup, addDoc, QuerySnapshot } from 'firebase/firestore';
import { MessageService } from 'primeng/api';
import { IUserData, IOrder, IUserProfile } from '../../types/user.interface';

@Injectable()
export class UserEffects {
	private actions$ = inject(Actions);
	private firestore = inject(Firestore);
	private messageService = inject(MessageService);

	loadProfile$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.loadProfile),
			switchMap(({ uid }) => {
				const q = query(collection(this.firestore, 'users'), where('uid', '==', uid));
				return from(getDocs(q)).pipe(
					switchMap((snapshot: QuerySnapshot) => {
						if (!snapshot.empty) {
							const userDoc = snapshot.docs[0];
							const userData = userDoc.data() as any;

							return from(getDocs(collection(this.firestore, 'users', userDoc.id, 'orders'))).pipe(
								map((orderSnapshot) => {
									const orders = orderSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as IOrder);
									return UserActions.loadProfileSuccess({
										userData: {
											profile: userData.profile,
											orders: orders,
										},
									});
								}),
								catchError((error) =>
									of(
										UserActions.loadProfileFailure({
											error: error.message || 'Failed to load user orders',
										})
									)
								)
							);
						} else {
							return of(UserActions.loadProfileFailure({ error: 'User profile not found' }));
						}
					}),
					catchError((error) => of(UserActions.loadProfileFailure({ error: error.message })))
				);
			})
		)
	);

	updateProfile$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.updateProfile),
			switchMap(({ uid, profile }) => {
				const q = query(collection(this.firestore, 'users'), where('uid', '==', uid));
				return from(getDocs(q)).pipe(
					switchMap((snapshot) => {
						if (!snapshot.empty) {
							const userDocId = snapshot.docs[0].id;
							return from(updateDoc(doc(this.firestore, 'users', userDocId), { profile })).pipe(
								map(() => {
									this.messageService.add({
										severity: 'success',
										summary: 'Success',
										detail: 'Profile updated successfully',
									});
									return UserActions.updateProfileSuccess({ profile });
								})
							);
						} else {
							return of(UserActions.updateProfileFailure({ error: 'User document not found' }));
						}
					}),
					catchError((error) => {
						this.messageService.add({
							severity: 'error',
							summary: 'Error',
							detail: 'Failed to update profile',
						});
						return of(UserActions.updateProfileFailure({ error: error.message }));
					})
				);
			})
		)
	);

	submitOrder$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.submitOrder),
			switchMap(({ uid, order }) => {
				console.log('UseEffects: Submitting order for uid:', uid);
				const q = query(collection(this.firestore, 'users'), where('uid', '==', uid));
				return from(getDocs(q)).pipe(
					switchMap((snapshot) => {
						if (!snapshot.empty) {
							const userDocId = snapshot.docs[0].id;
							console.log('UseEffects: User document found:', userDocId);
							return from(addDoc(collection(this.firestore, 'users', userDocId, 'orders'), order)).pipe(
								map((docRef) => {
									console.log('UseEffects: Order created with ID:', docRef.id);
									return UserActions.submitOrderSuccess({ order: { ...order, id: docRef.id } });
								}),
								catchError((error) => {
									console.error('UseEffects: Failed to add order doc:', error);
									return of(UserActions.submitOrderFailure({ error: error.message }));
								})
							);
						} else {
							console.warn('UseEffects: User document not found for uid:', uid);
							// Create user document if it doesn't exist (fallback)
							return of(UserActions.submitOrderFailure({ error: 'User document not found' }));
						}
					}),
					catchError((error) => {
						console.error('UseEffects: Error querying user doc:', error);
						return of(UserActions.submitOrderFailure({ error: error.message }));
					})
				);
			})
		)
	);
}
