import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export const authKey = 'AUTH';

export interface AuthState {
	isLoggedIn: boolean;
	user: { uid: string; displayName: string | null; email: string | null } | null;
	showAuthModal: boolean;
}

export const initialAuthState: AuthState = {
	isLoggedIn: false,
	user: null,
	showAuthModal: false,
};

export const authReducer = createReducer(
	initialAuthState,
	on(AuthActions.openAuthModal, (state) => ({
		...state,
		showAuthModal: true,
	})),
	on(AuthActions.closeAuthModal, (state) => ({
		...state,
		showAuthModal: false,
	})),
	on(AuthActions.setAuthState, (state, { user }) => ({
		...state,
		isLoggedIn: !!user,
		user,
	})),
	on(AuthActions.logout, (state) => ({
		...state,
		isLoggedIn: false,
		user: null,
		showAuthModal: false,
	}))
);
