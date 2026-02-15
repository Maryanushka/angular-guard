import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authKey, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authKey);

export const selectIsLoggedIn = createSelector(selectAuthState, (state: AuthState) => state.isLoggedIn);
export const selectUserUser = createSelector(selectAuthState, (state: AuthState) => state.user);
export const selectShowAuthModal = createSelector(selectAuthState, (state: AuthState) => state.showAuthModal);
