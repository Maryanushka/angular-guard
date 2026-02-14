import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
	selectProducts,
	selectProductsError,
	selectProductsLoading,
	selectBasketCount,
	selectSingleProduct,
	selectSingleProductError,
	selectSingleProductLoading,
	selectCategories,
	selectCategoriesLoading,
	selectCategoriesError,
	selectBasket,
} from './main.selectors';
import { Observable } from 'rxjs';
import { BasketLine, ICategory, IProduct, ISingleProduct } from '../../types/product.inteface';
import { ProductActions } from './main.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class MainFacade {
	private store = inject(Store);

	products$: Observable<IProduct[]> = this.store.pipe(select(selectProducts));
	productsLoading$: Observable<boolean> = this.store.pipe(select(selectProductsLoading));
	productsError$: Observable<HttpErrorResponse | null> = this.store.pipe(select(selectProductsError));

	basketCount$: Observable<number> = this.store.pipe(select(selectBasketCount));
	/** Basket list: one entry per product with quantity (separate from products list). */
	basket$: Observable<BasketLine[]> = this.store.pipe(select(selectBasket));

	singleProduct$: Observable<ISingleProduct | null> = this.store.pipe(select(selectSingleProduct));
	singleProductLoading$: Observable<boolean> = this.store.pipe(select(selectSingleProductLoading));
	singleProductError$: Observable<HttpErrorResponse | null> = this.store.pipe(select(selectSingleProductError));

	categories$: Observable<ICategory[]> = this.store.pipe(select(selectCategories));
	categoriesLoading$: Observable<boolean> = this.store.pipe(select(selectCategoriesLoading));
	categoriesError$: Observable<HttpErrorResponse | null> = this.store.pipe(select(selectCategoriesError));

	loadProducts(category: string | null, limit: number) {
		this.store.dispatch(ProductActions.loadProducts({ category, limit }));
	}
	loadSingleProduct(slug: string) {
		this.store.dispatch(ProductActions.loadProduct({ slug }));
	}
	loadCategories() {
		this.store.dispatch(ProductActions.loadCategories());
	}
	addToBasket(product: IProduct) {
		this.store.dispatch(ProductActions.addProduct({ product }));
	}

	removeFromBasket(product: IProduct) {
		this.store.dispatch(ProductActions.remove1FromBasket({ product }));
	}

	removeProduct(line: BasketLine) {
		this.store.dispatch(ProductActions.removeProduct({ product: line }));
	}
}
