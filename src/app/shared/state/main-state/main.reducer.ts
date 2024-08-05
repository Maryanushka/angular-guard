import { createReducer, on } from '@ngrx/store';
import { addProduct } from './main.actions';
import { IProduct } from '../../types/product.inteface';

export const productKey = 'PRODUCT';

export interface State {
  products: IProduct[];
}

export const initialState: State = {
  products: [],
};

export const productReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => ({...state, products: [...state.products, product]})),
);
