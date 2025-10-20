import { Injectable } from '@angular/core';
import { ICategory, IProduct, ISingleProduct } from '../../types/product.inteface';
import { delay, from, Observable, of, retry } from 'rxjs';
import type { SanityClient } from '@sanity/client';
import { SANITY_CLIENT } from '../../services/sanity-client.token';
import { Inject } from '@angular/core';
import groq from 'groq';
@Injectable({
	providedIn: 'root',
})
export class GetProductService {
	constructor(@Inject(SANITY_CLIENT) private sanity: SanityClient) {}
	getProducts(category: string | null, limit = 10): Observable<IProduct[]> {
		const query = groq`*[_type == "product"] | order(publishedAt desc)[0...20]{
      uid
    }`;
		return from(this.sanity.fetch<IProduct[]>(query)).pipe(retry(2), delay(200));
	}

	getSingleProduct(slug: string): Observable<ISingleProduct> {
		console.log(slug);
		return of<ISingleProduct>({} as unknown as ISingleProduct);
	}

	getCategories(): Observable<ICategory[]> {
		return of<ICategory[]>([]);
	}
}
