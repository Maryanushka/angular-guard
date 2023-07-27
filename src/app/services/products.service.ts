import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, delay, retry, tap, throwError } from 'rxjs';
import { IProduct } from '../models/product';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

	limit = 5
	products: IProduct[] = []

  constructor(
		private http: HttpClient,
		private errorService: ErrorService
	) { }

	getAll(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>(
			`https://fakestoreapi.com/products`, 
			{
				params: new HttpParams({
					fromObject: { limit : this.limit }
				})
			}
		).pipe(
			delay(200),
			retry(3),
			tap(products => this.products = products),
			catchError(this.handleError.bind(this))
		)
	}

	createProduct(product: IProduct): Observable<IProduct> {
		return this.http.post<IProduct>(`https://fakestoreapi.com/products`, product).pipe(
			tap(prod => this.products.push(prod))
		)
	}

	private handleError(error: HttpErrorResponse) {
		this.errorService.handle(error.message)
		return throwError(() => error.message)
	}
}
