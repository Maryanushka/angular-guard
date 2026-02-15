import { createReducer, on } from '@ngrx/store';
import { AppActions } from './main.actions';
import { BasketLine, ICategory, IProduct, ISingleProduct } from '../../types/product.inteface';
import { HttpErrorResponse } from '@angular/common/http';

export const productKey = 'PRODUCT';

export interface State {
	products: {
		data: IProduct[];
		total: number;
		loading: boolean;
		error: HttpErrorResponse | null;
	};
	basket: {
		data: BasketLine[];
		loading: boolean;
	};
	singleProduct: {
		data: ISingleProduct | null;
		loading: boolean;
		error: HttpErrorResponse | null;
	};
	categories: {
		data: ICategory[];
		loading: boolean;
		error: HttpErrorResponse | null;
	};
}

export const initialState: State = {
	basket: {
		data: [],
		loading: false,
	},
	products: {
		data: [],
		total: 0,
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
	},
};

export const productReducer = createReducer(
	initialState,
	on(AppActions.addProduct, (state, { product }) => {
		const isProductInBasket = state.basket.data.some((p) => p.product._slug === product._slug);
		if (isProductInBasket) {
			return {
				...state,
				basket: {
					data: state.basket.data.map((p) => (p.product._slug === product._slug ? { ...p, quantity: p.quantity + 1 } : p)),
					loading: false,
				},
			};
		}
		return {
			...state,
			basket: {
				data: [...state.basket.data, { product, quantity: 1 }],
				loading: false,
			},
		};
	}),
	on(AppActions.remove1FromBasket, (state, { product }) => {
		const idx = state.basket.data.findIndex((p) => p.product._slug === product._slug);
		if (idx === -1) return state;

		const data = [...state.basket.data];
		const line = data[idx];

		if (line.quantity > 1) {
			data[idx] = { ...line, quantity: line.quantity - 1 };
		} else {
			data.splice(idx, 1);
		}

		return {
			...state,
			basket: { ...state.basket, data, loading: false },
		};
	}),
	on(AppActions.removeProduct, (state, { product }) => {
		return {
			...state,
			basket: { data: state.basket.data.filter((p) => p.product._slug !== product.product._slug), loading: false },
		};
	}),
	on(AppActions.setBasket, (state, { items }) => ({
		...state,
		basket: { data: items.map((p) => ({ product: p, quantity: 1 })), loading: false },
	})),
	on(AppActions.loadProducts, (state, { offset }) => ({
		...state,
		products: {
			...state.products,
			data: offset === 0 ? [] : state.products.data,
			loading: true,
			error: null,
		},
	})),
	on(AppActions.loadProductsSuccess, (state, { products, total, offset }) => ({
		...state,
		products: {
			data: offset === 0 ? products : [...state.products.data, ...products],
			total,
			loading: false,
			error: null,
		},
	})),
	on(AppActions.loadProductsFailure, (state, { error }) => ({
		...state,
		products: {
			data: [],
			total: 0,
			loading: false,
			error: error,
		},
	})),
	on(AppActions.loadProduct, (state) => ({
		...state,
		loading: true,
	})),
	on(AppActions.loadProductSuccess, (state, { product }) => ({
		...state,
		singleProduct: {
			data: product,
			loading: false,
			error: null,
		},
	})),
	on(AppActions.loadProductFailure, (state, { error }) => ({
		...state,
		singleProduct: {
			data: null,
			loading: false,
			error: error,
		},
	})),
	on(AppActions.loadCategories, (state) => ({
		...state,
		categories: {
			...state.categories,
			loading: true,
			error: null,
		},
	})),
	on(AppActions.loadCategoriesSuccess, (state, { categories }) => ({
		...state,
		categories: {
			data: categories,
			loading: false,
			error: null,
		},
	})),
	on(AppActions.loadCategoriesFailure, (state, { error }) => ({
		...state,
		categories: {
			data: [],
			loading: false,
			error: error,
		},
	}))
);
