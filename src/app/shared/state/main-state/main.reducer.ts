import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './main.actions';
import { ICategory, IProduct, ISingleProduct } from '../../types/product.inteface';

export const productKey = 'PRODUCT';

export interface State {
  products: {
    data: IProduct[],
    loading: boolean,
    error: any,
  };
  singleProduct: {
    data: ISingleProduct | null,
    loading: boolean,
    error: any,
  };
  categories: {
    data: ICategory[],
    loading: boolean,
    error: any,
  }
}

export const initialState: State = {
  products: {
    data: [],
    loading: false,
    error: null,
  },
  singleProduct: {
    data: null,
    loading: false,
    error: null,
  },
  categories: {
    data: [],
    loading: false,
    error: null,
  }
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct, (state, { product }) => ({
    ...state,
    products: {
      data: [...state.products.data, product],
      loading: false,
      error: null,
    }
  })),
  on(ProductActions.deleteProduct, (state, { product }) => ({
    ...state,
    products: {
      data: state.products.data.filter((p) => p._slug !== product._slug),
      loading: false,
      error: null,
    },
  })),
  on(ProductActions.loadProducts, (state) => ({ ...state, loading: true })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: {
      data: products,
      loading: false,
      error: null,
    }
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ProductActions.loadProduct, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.loadProductSuccess, (state, { product }) => ({
    ...state,
    singleProduct: {
      data: product,
      loading: false,
      error: null,
    }
  })),
  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    singleProduct: {
      data: null,
      loading: false,
      error: error,
    }
  })),
  on(ProductActions.loadCategories, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: {
      data: categories,
      loading: false,
      error: null,
    }
  })),
  on(ProductActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
