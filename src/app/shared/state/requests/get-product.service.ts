import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { GetAllProducts } from "../../queries/getAllProducts";
import { ICategory, IProduct, ISingleProduct } from "../../types/product.inteface";
import { map, Observable } from "rxjs";
import { GetSingleProduct } from "../../queries/getSingleProduct";
import { GetCategories } from "../../queries/getCategory";

@Injectable({
  providedIn: 'root',
})

export class GetProductService {
  private apollo = inject(Apollo);

  getProducts(category: string | null, limit = 10): Observable<IProduct[]> {
    return this.apollo
      .watchQuery<any>({
        query: GetAllProducts,
        variables: {
          limit: limit,
          category: category,
        },
      })
      .valueChanges.pipe(
        map(({ data }) => {
          return data.Products.items
        })
      );
  };


  getSingleProduct(slug: string): Observable<ISingleProduct> {
    return this.apollo
      .watchQuery<any>({
        query: GetSingleProduct,
        variables: {
          slug: slug
        }
      })
      .valueChanges.pipe(
        map(({ data }) => data.Product)
      );
  }

  getCategories(): Observable<ICategory[]> {
    return this.apollo
      .watchQuery<any>({
        query: GetCategories
      })
      .valueChanges.pipe(map(({ data }) => data.Categories.items));
  }
};

