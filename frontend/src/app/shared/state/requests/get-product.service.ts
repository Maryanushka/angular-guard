import { inject, Injectable } from '@angular/core';
import { ICategory, IProduct, ISingleProduct } from '../../types/product.inteface';
import { delay, from, Observable, retry } from 'rxjs';
import { map } from 'rxjs/operators';
import { SANITY_CLIENT } from '../../services/sanity-client.token';
import { getCategoriesQuery, getProductCountQuery, getProductsQuery, getSingleProductQuery } from './product.queries';

@Injectable({
	providedIn: 'root',
})
export class GetProductService {
	private sanity = inject(SANITY_CLIENT);

	getProducts(category?: string | null, limit?: number, offset = 0, end = 0): Observable<IProduct[]> {
		const limitVal = limit ?? 20;
		const params = { category: category ?? null, offset, end: offset + limitVal };
		return from(this.sanity.fetch<IProduct[]>(getProductsQuery, params)).pipe(retry(2), delay(200));
	}

	getProductCount(category?: string | null): Observable<number> {
		const params = { category: category ?? null };
		return from(this.sanity.fetch<number>(getProductCountQuery, params)).pipe(retry(2), delay(100));
	}

	getSingleProduct(slug: string): Observable<ISingleProduct> {
		return from(this.sanity.fetch<ISingleProduct | null>(getSingleProductQuery, { slug })).pipe(
			retry(2),
			delay(200),
			map((product) => product ?? ({} as ISingleProduct))
		);
	}

	getCategories(): Observable<ICategory[]> {
		return from(this.sanity.fetch<ICategory[]>(getCategoriesQuery)).pipe(retry(2), delay(200));
	}
}
