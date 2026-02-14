import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './main.actions';
import { ICategory, IProduct, ISingleProduct } from '../../types/product.inteface';

export const productKey = 'PRODUCT';

export interface State {
	products: {
		data: IProduct[];
		loading: boolean;
		error: any;
	};
	basket: {
		data: ISingleProduct[];
		loading: boolean;
	};
	singleProduct: {
		data: ISingleProduct | null;
		loading: boolean;
		error: any;
	};
	categories: {
		data: ICategory[];
		loading: boolean;
		error: any;
	};
}

export const initialState: State = {
	basket: {
		data: [],
		loading: false,
	},
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
	},
};

export const productReducer = createReducer(
	initialState,
	on(ProductActions.addProduct, (state, { product }) => ({
		...state,
		basket: {
			data: [...state.basket.data, product],
			loading: false,
		},
	})),
	on(ProductActions.deleteProduct, (state, { product }) => ({
		...state,
		basket: {
			data: state.basket.data.filter((p) => p._slug !== product._slug),
			loading: false,
		},
	})),
	on(ProductActions.removeOneFromBasket, (state, { product }) => {
		const idx = state.basket.data.findIndex((p) => p._slug === product._slug);
		if (idx === -1) return state;
		const data = [...state.basket.data];
		data.splice(idx, 1);
		return {
			...state,
			basket: { data, loading: false },
		};
	}),
	on(ProductActions.loadProducts, (state) => ({
		...state,
		products: {
			data: [],
			loading: true,
			error: null,
		},
	})),
	on(ProductActions.loadProductsSuccess, (state, { products }) => ({
		...state,
		products: {
			data: products,
			loading: false,
			error: null,
		},
	})),
	on(ProductActions.loadProductsFailure, (state, { error }) => ({
		...state,
		products: {
			data: [],
			loading: false,
			error: error,
		},
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
		},
	})),
	on(ProductActions.loadProductFailure, (state, { error }) => ({
		...state,
		singleProduct: {
			data: null,
			loading: false,
			error: error,
		},
	})),
	on(ProductActions.loadCategories, (state) => ({
		...state,
		categories: {
			data: [],
			loading: true,
			error: null,
		},
	})),
	on(ProductActions.loadCategoriesSuccess, (state, { categories }) => ({
		...state,
		categories: {
			data: categories,
			loading: false,
			error: null,
		},
	})),
	on(ProductActions.loadCategoriesFailure, (state, { error }) => ({
		...state,
		categories: {
			data: [],
			loading: false,
			error: error,
		},
	}))
);
