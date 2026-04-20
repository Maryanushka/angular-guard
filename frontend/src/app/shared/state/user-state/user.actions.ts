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
		'Submit Order': props<{ uid: string; order: Omit<IOrder, 'id'> }>(),
		'Submit Order Success': props<{ order: IOrder }>(),
		'Submit Order Failure': props<{ error: string }>(),
		'Upload File': props<{ uid: string; file: File; folderName: string }>(),
		'Upload File Success': props<{ document: { name: string; url: string } }>(),
		'Upload File Failure': props<{ error: string }>(),
		'Delete File': props<{ uid: string; document: { name: string; url: string } }>(),
		'Delete File Success': props<{ url: string }>(),
		'Delete File Failure': props<{ error: string }>(),
		'Clear User Data': emptyProps(),
	},
});
