import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthActions } from './auth.actions';
import { Auth, authState, User } from '@angular/fire/auth';
import { AuthService } from '../../../product/services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthEffects {
	private actions$ = inject(Actions);
	private auth = inject(Auth);
	private authService = inject(AuthService);
	private messageService = inject(MessageService);

	authState$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ROOT_EFFECTS_INIT),
			switchMap(() =>
				authState(this.auth).pipe(
					map((firebaseUser: User | null) => {
						if (firebaseUser) {
							return AuthActions.setAuthState({
								user: {
									uid: firebaseUser.uid,
									displayName: firebaseUser.displayName,
									email: firebaseUser.email,
								},
							});
						}
						return AuthActions.setAuthState({ user: null });
					})
				)
			)
		)
	);

	register$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.register),
			switchMap(({ name, email, password }) =>
				from(this.authService.registerUser(name, email, password)).pipe(
					map(() => AuthActions.authSuccess()),
					catchError((error) => of(AuthActions.authFailure({ error: error.message || 'Registration failed' })))
				)
			)
		)
	);

	loginGoogle$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.loginGoogle),
			switchMap(() =>
				from(this.authService.signInWithGoogle()).pipe(
					map(() => AuthActions.authSuccess()),
					catchError((error) => of(AuthActions.authFailure({ error: error.message || 'Google sign-in failed' })))
				)
			)
		)
	);

	loginEmail$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.loginEmail),
			switchMap(({ email, password }) =>
				from(this.authService.signInWithEmail(email, password)).pipe(
					map(() => AuthActions.authSuccess()),
					catchError((error) => of(AuthActions.authFailure({ error: error.message || 'Email sign-in failed' })))
				)
			)
		)
	);

	authSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.authSuccess),
			map(() => AuthActions.closeAuthModal())
		)
	);

	authFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.authFailure),
			tap(({ error }) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Authentication Error',
					detail: error,
				});
			})
		),
		{ dispatch: false }
	);

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.logout),
			switchMap(() => from(this.authService.signOut())),
			map(() => AuthActions.setAuthState({ user: null }))
		)
	);

	updateEmail$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.updateEmail),
			switchMap(({ newEmail }) =>
				from(this.authService.updateUserEmail(newEmail)).pipe(
					map(() => AuthActions.updateEmailSuccess()),
					catchError((error) => of(AuthActions.updateEmailFailure({ error: error.message || 'Email update failed' })))
				)
			)
		)
	);

	updateEmailSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.updateEmailSuccess),
			tap(() => {
				this.messageService.add({
					severity: 'success',
					summary: 'Verification Sent',
					detail: 'A verification link has been sent to your new email address. Please confirm it to complete the update.',
				});
			})
		),
		{ dispatch: false }
	);

	updateEmailFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.updateEmailFailure),
			tap(({ error }) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Update Failed',
					detail: error,
				});
			})
		),
		{ dispatch: false }
	);
}
