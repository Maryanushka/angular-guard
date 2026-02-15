import { HttpErrorResponse } from '@angular/common/http';
import { BasketLine, ICategory, IProduct, ISingleProduct } from './../../types/product.inteface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AppActions = createActionGroup({
	source: 'App',
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
		// auth
		'Open Auth Modal': emptyProps(),
		'Close Auth Modal': emptyProps(),
		'Set Auth State': props<{ user: { uid: string; displayName: string | null; email: string | null } | null }>(),
		'Logout': emptyProps(),
		'Register': props<{ name: string; email: string; password: string }>(),
		'Login Google': emptyProps(),
		'Login Email': props<{ email: string; password: string }>(),
		'Auth Success': emptyProps(),
		'Auth Failure': props<{ error: string }>(),
	},
});
