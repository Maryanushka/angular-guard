import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { IUserData } from '../../types/user.interface';

export const userKey = 'USER';

export interface UserState {
	data: IUserData | null;
	loading: boolean;
	uploading: boolean;
	error: string | null;
}

export const initialUserState: UserState = {
	data: null,
	loading: false,
	uploading: false,
	error: null,
};

export const userReducer = createReducer(
	initialUserState,
	on(UserActions.loadProfile, (state) => ({
		...state,
		loading: true,
		error: null,
	})),
	on(UserActions.loadProfileSuccess, (state, { userData }) => ({
		...state,
		data: userData,
		loading: false,
		error: null,
	})),
	on(UserActions.loadProfileFailure, (state, { error }) => ({
		...state,
		loading: false,
		error: error,
	})),
	on(UserActions.updateProfile, (state) => ({
		...state,
		loading: true,
	})),
	on(UserActions.updateProfileSuccess, (state, { profile }) => ({
		...state,
		data: state.data ? { ...state.data, profile } : null,
		loading: false,
	})),
	on(UserActions.submitOrderSuccess, (state, { order }) => ({
		...state,
		data: state.data ? { ...state.data, orders: [...state.data.orders, order] } : null,
		loading: false,
	})),
	on(UserActions.uploadFile, (state) => ({
		...state,
		uploading: true,
		error: null,
	})),
	on(UserActions.uploadFileSuccess, (state, { document }) => ({
		...state,
		uploading: false,
		data: state.data
			? {
					...state.data,
					profile: {
						...state.data.profile,
						documents: [...(state.data.profile.documents || []), document],
					},
			  }
			: null,
	})),
	on(UserActions.uploadFileFailure, (state, { error }) => ({
		...state,
		uploading: false,
		error,
	})),
	on(UserActions.deleteFileSuccess, (state, { url }) => ({
		...state,
		data: state.data
			? {
					...state.data,
					profile: {
						...state.data.profile,
						documents: (state.data.profile.documents || []).filter((doc) => doc.url !== url),
					},
			  }
			: null,
	})),
	on(UserActions.deleteFileFailure, (state, { error }) => ({
		...state,
		error,
	})),
	on(UserActions.clearUserData, () => initialUserState)
);
