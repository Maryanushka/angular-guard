import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { GetAllProducts } from "../../queries/getAllProducts";
import { IProduct } from "../../types/product.inteface";
import { map, Observable } from "rxjs";

@Injectable({
	providedIn: 'root',
})

export class GetProductService {
  constructor(private apollo: Apollo) {}


  getProducts(category: string): Observable<IProduct[]> {
    return this.apollo
        .watchQuery<any>({
          query: GetAllProducts,
          variables: {
            limit: 10,
            category: category,
          },
        })
        .valueChanges.pipe(
          map(({ data }) => data.products.items)
        );
      }
  }
