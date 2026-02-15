import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
	source: 'Auth',
	events: {
		'Open Auth Modal': emptyProps(),
		'Close Auth Modal': emptyProps(),
		'Set Auth State': props<{ user: { uid: string; displayName: string | null; email: string | null } | null }>(),
		'Login Google': emptyProps(),
		'Login Email': props<{ email: string; password: string }>(),
		'Register': props<{ name: string; email: string; password: string }>(),
		'Auth Success': emptyProps(),
		'Auth Failure': props<{ error: string }>(),
		'Logout': emptyProps(),
		'Update Email': props<{ newEmail: string }>(),
		'Update Email Success': emptyProps(),
		'Update Email Failure': props<{ error: string }>(),
	},
});
