import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUserData, IUserProfile, IOrder } from '../../types/user.interface';

export const UserActions = createActionGroup({
	source: 'User',
	events: {
		'Load Profile': props<{ uid: string }>(),
		'Load Profile Success': props<{ userData: IUserData }>(),
		'Load Profile Failure': props<{ error: string }>(),
		'Update Profile': props<{ uid: string; profile: IUserProfile }>(),
		'Update Profile Success': props<{ profile: IUserProfile }>(),
		'Update Profile Failure': props<{ error: string }>(),
		'Clear User Data': emptyProps(),
	},
});
