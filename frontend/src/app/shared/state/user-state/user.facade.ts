import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUserProfile, selectUserOrders, selectUserLoading, selectUserError } from './user.selectors';
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

	loadProfile(uid: string) {
		this.store.dispatch(UserActions.loadProfile({ uid }));
	}

	updateProfile(uid: string, profile: IUserProfile) {
		this.store.dispatch(UserActions.updateProfile({ uid, profile }));
	}

	submitOrder(uid: string, order: Omit<IOrder, 'id'>) {
		this.store.dispatch(UserActions.submitOrder({ uid, order }));
	}

	clearUserData() {
		this.store.dispatch(UserActions.clearUserData());
	}
}
