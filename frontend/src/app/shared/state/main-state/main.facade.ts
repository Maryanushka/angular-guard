import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
	selectProducts,
	selectProductsTotal,
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
	selectIsLoggedIn,
	selectUser,
	selectShowAuthModal,
} from './main.selectors';
import { Observable } from 'rxjs';
import { BasketLine, ICategory, IProduct, ISingleProduct } from '../../types/product.inteface';
import { AppActions } from './main.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class MainFacade {
	private store = inject(Store);

	products$: Observable<IProduct[]> = this.store.pipe(select(selectProducts));
	productsTotal$: Observable<number> = this.store.pipe(select(selectProductsTotal));
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

	// Auth
	isLoggedIn$: Observable<boolean> = this.store.pipe(select(selectIsLoggedIn));
	user$ = this.store.pipe(select(selectUser));
	showAuthModal$: Observable<boolean> = this.store.pipe(select(selectShowAuthModal));

	loadProducts(category: string | null, limit: number, offset: number) {
		this.store.dispatch(AppActions.loadProducts({ category, limit, offset }));
	}
	loadSingleProduct(slug: string) {
		this.store.dispatch(AppActions.loadProduct({ slug }));
	}
	loadCategories() {
		this.store.dispatch(AppActions.loadCategories());
	}
	addToBasket(product: IProduct) {
		this.store.dispatch(AppActions.addProduct({ product }));
	}

	removeFromBasket(product: IProduct) {
		this.store.dispatch(AppActions.remove1FromBasket({ product }));
	}

	removeProduct(line: BasketLine) {
		this.store.dispatch(AppActions.removeProduct({ product: line }));
	}

	// Auth actions
	openAuthModal() {
		this.store.dispatch(AppActions.openAuthModal());
	}

	closeAuthModal() {
		this.store.dispatch(AppActions.closeAuthModal());
	}

	logout() {
		this.store.dispatch(AppActions.logout());
	}

	register(name: string, email: string, password: string) {
		this.store.dispatch(AppActions.register({ name, email, password }));
	}

	loginGoogle() {
		this.store.dispatch(AppActions.loginGoogle());
	}

	loginEmail(email: string, password: string) {
		this.store.dispatch(AppActions.loginEmail({ email, password }));
	}
}

