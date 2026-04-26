import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, mergeMap, last } from 'rxjs/operators';
import { UserActions } from './user.actions';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { MessageService } from 'primeng/api';
import { IOrder, IUserProfile } from '../../types/user.interface';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

@Injectable()
export class UserEffects {
	private actions$ = inject(Actions);
	private firestore = inject(Firestore);
	private messageService = inject(MessageService);
	private fileUploadService = inject(FileUploadService);

	loadProfile$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.loadProfile),
			switchMap(({ uid }) => {
				const userDocRef = doc(this.firestore, 'users', uid);
				return from(getDoc(userDocRef)).pipe(
					switchMap((snapshot) => {
						if (snapshot.exists()) {
							const userData = snapshot.data() as { profile: IUserProfile };

							return from(getDocs(collection(this.firestore, 'users', uid, 'orders'))).pipe(
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
				const userDocRef = doc(this.firestore, 'users', uid);
				return from(updateDoc(userDocRef, { profile })).pipe(
					map(() => {
						this.messageService.add({
							severity: 'success',
							summary: 'Success',
							detail: 'Profile updated successfully',
						});
						return UserActions.updateProfileSuccess({ profile });
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
			switchMap(({ uid, order }) =>
				from(addDoc(collection(this.firestore, 'users', uid, 'orders'), order)).pipe(
					map((docRef) => UserActions.submitOrderSuccess({ order: { ...order, id: docRef.id } })),
					catchError((error) => of(UserActions.submitOrderFailure({ error: error.message })))
				)
			)
		)
	);

	uploadFile$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.uploadFile),
			mergeMap(({ uid, file, folderName }) =>
				this.fileUploadService.uploadFile(uid, file, folderName).pipe(
					last(),
					map((result) => UserActions.uploadFileSuccess({ document: { name: result.fileName || file.name, url: result.downloadUrl! } })),
					catchError((error) => of(UserActions.uploadFileFailure({ error: error.message || 'Upload failed' })))
				)
			)
		)
	);

	deleteFile$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.deleteFile),
			mergeMap(({ uid, document }) =>
				from(this.fileUploadService.deleteFile(uid, document)).pipe(
					map(() => UserActions.deleteFileSuccess({ url: document.url })),
					catchError((error) => of(UserActions.deleteFileFailure({ error: error.message || 'Delete failed' })))
				)
			)
		)
	);
}
