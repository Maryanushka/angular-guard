import { ISingleProduct } from './../../types/product.inteface';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { GetProductService } from '../requests/get-product.service';
import { AppActions } from './main.actions';
import { MainFacade } from './main.facade';

@Injectable()
export class MainEffects {
	private service = inject(GetProductService);
	private actions$ = inject(Actions);
	private facade = inject(MainFacade);

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
}
