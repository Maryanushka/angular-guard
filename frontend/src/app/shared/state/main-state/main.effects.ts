import { ISingleProduct } from './../../types/product.inteface';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { forkJoin, from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { GetProductService } from '../requests/get-product.service';
import { AppActions } from './main.actions';
import { MainFacade } from './main.facade';
import { Auth, authState } from '@angular/fire/auth';
import { AuthService } from '../../../product/services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class MainEffects {
	private service = inject(GetProductService);
	private actions$ = inject(Actions);
	private facade = inject(MainFacade);
	private auth = inject(Auth);
	private authService = inject(AuthService);
	private messageService = inject(MessageService);

	loadProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.loadProducts),
			switchMap(({ category, limit, offset }) =>
				forkJoin({
					products: this.service.getProducts(category, limit, offset),
					total: this.service.getProductCount(category),
				}).pipe(
					map(({ products, total }) => AppActions.loadProductsSuccess({ products, total, offset })),
					catchError((error) => of(AppActions.loadProductsFailure({ error })))
				)
			)
		)
	);

	loadSingleProduct$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.loadProduct),
			mergeMap(({ slug }) =>
				this.service.getSingleProduct(slug).pipe(
					map((product: ISingleProduct) => AppActions.loadProductSuccess({ product })),
					catchError((error) => of(AppActions.loadProductFailure({ error })))
				)
			)
		)
	);

	loadCategories$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.loadCategories),
			withLatestFrom(this.facade.categories$),
			filter(([_, categories]) => categories.length === 0),
			switchMap(() =>
				this.service.getCategories().pipe(
					map((categories) => AppActions.loadCategoriesSuccess({ categories })),
					catchError((error) => of(AppActions.loadCategoriesFailure({ error })))
				)
			)
		)
	);

	// Firebase auth state listener — auto-detects login/logout/token expiry
	authState$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ROOT_EFFECTS_INIT),
			switchMap(() =>
				authState(this.auth).pipe(
					map((firebaseUser) => {
						if (firebaseUser) {
							return AppActions.setAuthState({
								user: {
									uid: firebaseUser.uid,
									displayName: firebaseUser.displayName,
									email: firebaseUser.email,
								},
							});
						}
						return AppActions.setAuthState({ user: null });
					})
				)
			)
		)
	);

	// Register
	register$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.register),
			switchMap(({ name, email, password }) =>
				from(this.authService.registerUser(name, email, password)).pipe(
					map(() => AppActions.authSuccess()),
					catchError((error) => of(AppActions.authFailure({ error: error.message || 'Registration failed' })))
				)
			)
		)
	);

	// Login with Google
	loginGoogle$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.loginGoogle),
			switchMap(() =>
				from(this.authService.signInWithGoogle()).pipe(
					map(() => AppActions.authSuccess()),
					catchError((error) => of(AppActions.authFailure({ error: error.message || 'Google sign-in failed' })))
				)
			)
		)
	);

	// Login with Email
	loginEmail$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.loginEmail),
			switchMap(({ email, password }) =>
				from(this.authService.signInWithEmail(email, password)).pipe(
					map(() => AppActions.authSuccess()),
					catchError((error) => of(AppActions.authFailure({ error: error.message || 'Email sign-in failed' })))
				)
			)
		)
	);

	// Auth success — close modal
	authSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.authSuccess),
			map(() => AppActions.closeAuthModal())
		)
	);

	// Auth failure — show toast
	authFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.authFailure),
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

	// Logout effect — calls Firebase signOut
	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.logout),
			switchMap(() => from(this.authService.signOut())),
			map(() => AppActions.setAuthState({ user: null }))
		)
	);
}
