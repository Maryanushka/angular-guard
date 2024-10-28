import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProduct } from '../../types/product.inteface';
import { productKey, State } from './main.reducer';

export const selectState = createFeatureSelector<State>(productKey);

export const selectProducts = createSelector(
  selectState,
  (state: State) => state.products.data
);
export const selectProductsLoading = createSelector(
  selectState,
  (state: State) => state.products.loading
);
export const selectProductsError = createSelector(
  selectState,
  (state: State) => state.products.error
);
export const selectProductsCount = createSelector(
  selectState,
  (state: State) => state.products.data.length
);

export const selectSingleProduct = createSelector(
  selectState,
  (state: State) => state.singleProduct.data
);
export const selectSingleProductLoading = createSelector(
  selectState,
  (state: State) => state.singleProduct.loading
);
export const selectSingleProductError = createSelector(
  selectState,
  (state: State) => state.singleProduct.error
);

export const selectCategories = createSelector(
  selectState,
  (state: State) => state.categories.data
);
export const selectCategoriesLoading = createSelector(
  selectState,
  (state: State) => state.categories.loading
);
export const selectCategoriesError = createSelector(
  selectState,
  (state: State) => state.categories.error
);
