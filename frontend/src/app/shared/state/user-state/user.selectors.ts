import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userKey, UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>(userKey);

export const selectUserProfile = createSelector(selectUserState, (state: UserState) => state.data?.profile);
export const selectUserOrders = createSelector(selectUserState, (state: UserState) => state.data?.orders ?? []);
export const selectUserLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectUserError = createSelector(selectUserState, (state: UserState) => state.error);
