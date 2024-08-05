import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProduct } from '../../types/product.inteface';
import { productKey, State } from './main.reducer';

export const selectState = createFeatureSelector<State>(productKey);

export const selectProducts = createSelector(
	selectState,
	(state: State) => state.products
);
export const selectProductsCount = createSelector(
	selectState,
	(state: State) => state.products.length
);
