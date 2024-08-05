import { IProduct } from './../../types/product.inteface';
import { createAction, props } from '@ngrx/store';

export const addProduct = createAction(
  '[Products] Add Product',
  props<{ product: IProduct }>()
);
