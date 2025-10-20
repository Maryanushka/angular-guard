import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError, retry, delay, tap, catchError } from 'rxjs';
import { ErrorService } from '../../shared/services/error.service';
import { IProduct } from '../../shared/types/product.inteface';
import type { SanityClient } from '@sanity/client';
import { SANITY_CLIENT } from '../../shared/services/sanity-client.token';
import { Inject } from '@angular/core';
import groq from 'groq';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	limit = 50;
	products: IProduct[] = [];

	constructor(@Inject(SANITY_CLIENT) private sanity: SanityClient) {}

	getAll(): Observable<IProduct[]> {
		const query = groq`*[_type == "product"] | order(publishedAt desc)[0...20]{
      uid
    }`;
		return from(this.sanity.fetch<IProduct[]>(query)).pipe(retry(2), delay(200));
	}
}
