import { HttpErrorResponse } from '@angular/common/http';
import { BasketLine, ICategory, IProduct, ISingleProduct } from './../../types/product.inteface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductActions = createActionGroup({
	source: 'Products',
	events: {
		'Add Product': props<{ product: IProduct }>(),
		'Remove 1 From Basket': props<{ product: IProduct }>(),
		'Remove Product': props<{ product: BasketLine }>(),
		'Set Basket': props<{ items: IProduct[] }>(),
		// all products (offset 0 = replace list, offset > 0 = append for load more)
		'Load Products': props<{ category: string | null; limit: number; offset: number }>(),
		'Load Products Success': props<{ products: IProduct[]; total: number; offset: number }>(),
		'Load Products Failure': props<{ error: HttpErrorResponse }>(),
		// single product
		'Load Product': props<{ slug: string }>(),
		'Load Product Success': props<{ product: ISingleProduct }>(),
		'Load Product Failure': props<{ error: HttpErrorResponse }>(),
		// load categories
		'Load Categories': emptyProps(),
		'Load Categories Success': props<{ categories: ICategory[] }>(),
		'Load Categories Failure': props<{ error: HttpErrorResponse }>(),
	},
});
