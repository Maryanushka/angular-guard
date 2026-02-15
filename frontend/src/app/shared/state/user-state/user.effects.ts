import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap, mergeMap, concatMap } from 'rxjs/operators';
import { UserActions } from './user.actions';
import { Firestore, collection, query, where, getDocs, doc, updateDoc, collectionGroup } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { QuerySnapshot } from '@angular/fire/firestore';
import { IUserData, IOrder, IUserProfile } from '../../types/user.interface';

@Injectable()
export class UserEffects {
	private actions$ = inject(Actions);
	private firestore = inject(Firestore);
	private messageService = inject(MessageService);
	private injector = inject(Injector);

	loadProfile$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.loadProfile),
			switchMap(({ uid }) => {
				return runInInjectionContext(this.injector, () => {
					const q = query(collection(this.firestore, 'users'), where('uid', '==', uid));
					return from(getDocs(q)).pipe(
						switchMap((snapshot: QuerySnapshot) => {
							if (!snapshot.empty) {
								const userDoc = snapshot.docs[0];
								const userData = userDoc.data() as any;

								return runInInjectionContext(this.injector, () =>
									from(getDocs(collection(this.firestore, 'users', userDoc.id, 'orders'))).pipe(
										map((orderSnapshot) => {
											const orders = orderSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as IOrder);
											return UserActions.loadProfileSuccess({
												userData: {
													profile: userData.profile,
													orders: orders,
												},
											});
										}),
										catchError(() =>
											of(
												UserActions.loadProfileSuccess({
													userData: {
														profile: userData.profile,
														orders: [],
													},
												})
											)
										)
									)
								);
							} else {
								return of(UserActions.loadProfileFailure({ error: 'User profile not found' }));
							}
						}),
						catchError((error) => of(UserActions.loadProfileFailure({ error: error.message })))
					);
				});
			})
		)
	);

	updateProfile$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.updateProfile),
			switchMap(({ uid, profile }) => {
				return runInInjectionContext(this.injector, () => {
					const q = query(collection(this.firestore, 'users'), where('uid', '==', uid));
					return from(getDocs(q)).pipe(
						switchMap((snapshot) => {
							if (!snapshot.empty) {
								const userDocId = snapshot.docs[0].id;
								return runInInjectionContext(this.injector, () =>
									from(updateDoc(doc(this.firestore, 'users', userDocId), { profile })).pipe(
										map(() => {
											this.messageService.add({
												severity: 'success',
												summary: 'Success',
												detail: 'Profile updated successfully',
											});
											return UserActions.updateProfileSuccess({ profile });
										})
									)
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
				});
			})
		)
	);
}
