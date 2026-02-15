import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productKey, State } from './main.reducer';

export const selectState = createFeatureSelector<State>(productKey);

export const selectProducts = createSelector(selectState, (state: State) => state.products.data);
export const selectProductsTotal = createSelector(selectState, (state: State) => state.products.total);
export const selectProductsLoading = createSelector(selectState, (state: State) => state.products.loading);
export const selectProductsError = createSelector(selectState, (state: State) => state.products.error);
export const selectBasketCount = createSelector(selectState, (state: State) => state.basket.data.reduce((sum, line) => sum + line.quantity, 0));
/** Basket as stored: one entry per product with quantity (separate from products list). */
export const selectBasket = createSelector(selectState, (state: State) => state.basket.data);

export const selectSingleProduct = createSelector(selectState, (state: State) => state.singleProduct.data);
export const selectSingleProductLoading = createSelector(selectState, (state: State) => state.singleProduct.loading);
export const selectSingleProductError = createSelector(selectState, (state: State) => state.singleProduct.error);

export const selectCategories = createSelector(selectState, (state: State) => state.categories.data);
export const selectCategoriesLoading = createSelector(selectState, (state: State) => state.categories.loading);
export const selectCategoriesError = createSelector(selectState, (state: State) => state.categories.error);
