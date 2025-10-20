import { inject, Injectable } from '@angular/core';
import { GetAllProducts } from '../../queries/getAllProducts';
import {
  ICategory,
  IProduct,
  ISingleProduct,
} from '../../types/product.inteface';
import { map, Observable, of } from 'rxjs';
import { GetSingleProduct } from '../../queries/getSingleProduct';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  constructor(private http: HttpClient) { }
  getProducts(category: string | null, limit = 10): Observable<IProduct[]> {
    return of<IProduct[]>([]);
  }

  getSingleProduct(slug: string): Observable<ISingleProduct> {
    return of<ISingleProduct>({} as unknown as ISingleProduct);
  }

  getCategories(): Observable<ICategory[]> {
    return of<ICategory[]>([]);
  }
}
