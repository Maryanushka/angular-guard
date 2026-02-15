import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn, selectUserUser, selectShowAuthModal } from './auth.selectors';
import { AuthActions } from './auth.actions';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthFacade {
	private store = inject(Store);

	isLoggedIn$: Observable<boolean> = this.store.pipe(select(selectIsLoggedIn));
	user$ = this.store.pipe(select(selectUserUser));
	showAuthModal$: Observable<boolean> = this.store.pipe(select(selectShowAuthModal));

	openAuthModal() {
		this.store.dispatch(AuthActions.openAuthModal());
	}

	closeAuthModal() {
		this.store.dispatch(AuthActions.closeAuthModal());
	}

	logout() {
		this.store.dispatch(AuthActions.logout());
	}

	register(name: string, email: string, password: string) {
		this.store.dispatch(AuthActions.register({ name, email, password }));
	}

	loginGoogle() {
		this.store.dispatch(AuthActions.loginGoogle());
	}

	loginEmail(email: string, password: string) {
		this.store.dispatch(AuthActions.loginEmail({ email, password }));
	}

	updateEmail(newEmail: string) {
		this.store.dispatch(AuthActions.updateEmail({ newEmail }));
	}
}
