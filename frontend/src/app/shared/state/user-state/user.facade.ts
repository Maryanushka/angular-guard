import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUserProfile, selectUserOrders, selectUserLoading, selectUserError, selectUserDocuments, selectUserUploading } from './user.selectors';
import { UserActions } from './user.actions';
import { IUserProfile, IOrder } from '../../types/user.interface';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserFacade {
	private store = inject(Store);

	profile$ = this.store.pipe(select(selectUserProfile));
	orders$ = this.store.pipe(select(selectUserOrders));
	loading$: Observable<boolean> = this.store.pipe(select(selectUserLoading));
	error$: Observable<string | null> = this.store.pipe(select(selectUserError));
	documents$ = this.store.pipe(select(selectUserDocuments));
	uploading$: Observable<boolean> = this.store.pipe(select(selectUserUploading));

	loadProfile(uid: string) {
		this.store.dispatch(UserActions.loadProfile({ uid }));
	}

	updateProfile(uid: string, profile: IUserProfile) {
		this.store.dispatch(UserActions.updateProfile({ uid, profile }));
	}

	submitOrder(uid: string, order: Omit<IOrder, 'id'>) {
		this.store.dispatch(UserActions.submitOrder({ uid, order }));
	}

	uploadFile(uid: string, file: File, folderName: string) {
		this.store.dispatch(UserActions.uploadFile({ uid, file, folderName }));
	}

	deleteFile(uid: string, document: { name: string; url: string }) {
		this.store.dispatch(UserActions.deleteFile({ uid, document }));
	}

	clearUserData() {
		this.store.dispatch(UserActions.clearUserData());
	}
}
