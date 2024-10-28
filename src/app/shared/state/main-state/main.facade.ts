import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectProductsCount,
  selectSingleProduct,
  selectSingleProductError,
  selectSingleProductLoading,
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError
} from './main.selectors';
import { Observable } from 'rxjs';
import { ICategory, IProduct, ISingleProduct } from '../../types/product.inteface';
import { ProductActions } from './main.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MainFacade {
  private store = inject(Store);

  products$: Observable<IProduct[]> = this.store.pipe(select(selectProducts));
  productsLoading$: Observable<boolean> = this.store.pipe(select(selectProductsLoading));
  productsError$: Observable<any> = this.store.pipe(select(selectProductsError));

  productsCount$: Observable<number> = this.store.pipe(select(selectProductsCount));

  singleProduct$: Observable<ISingleProduct | null> = this.store.pipe(select(selectSingleProduct));
  singleProductLoading$: Observable<boolean> = this.store.pipe(select(selectSingleProductLoading));
  singleProductError$: Observable<HttpErrorResponse> = this.store.pipe(select(selectSingleProductError));

  categories$: Observable<ICategory[]> = this.store.pipe(select(selectCategories));
  categoriesLoading$: Observable<boolean> = this.store.pipe(select(selectCategoriesLoading));
  categoriesError$: Observable<HttpErrorResponse> = this.store.pipe(select(selectCategoriesError));

  loadProducts(category: string | null, limit: number) {
    this.store.dispatch(ProductActions.loadProducts({ category, limit }));
  }
  loadSingleProduct(slug: string) {
    this.store.dispatch(ProductActions.loadProduct({ slug }));
  }
  loadCategories() {
    this.store.dispatch(ProductActions.loadCategories());
  }
}
