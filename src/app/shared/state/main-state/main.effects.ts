import { IProduct, ISingleProduct } from './../../types/product.inteface';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { GetProductService } from '../requests/get-product.service';
import { ProductActions } from './main.actions';

@Injectable()
export class MainEffects {
  private service = inject(GetProductService);
  private actions$ = inject(Actions);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(({ category, limit }) =>
        this.service.getProducts(category, limit).pipe(
          map((products: IProduct[]) =>
            ProductActions.loadProductsSuccess({ products }),
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  loadSingleProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      mergeMap(({ slug }) =>
        this.service.getSingleProduct(slug).pipe(
          map((product: ISingleProduct) =>
            ProductActions.loadProductSuccess({ product }),
          ),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error })),
          ),
        ),
      ),
    ),
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadCategories),
      switchMap(() =>
        this.service.getCategories().pipe(
          map((categories) =>
            ProductActions.loadCategoriesSuccess({ categories }),
          ),
          catchError((error) =>
            of(ProductActions.loadCategoriesFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
