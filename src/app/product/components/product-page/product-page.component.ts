import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { IProduct } from '../../components/product-item/models/product.inteface';
import { Observable, Subscription, tap } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GetAllProducts } from '../../../shared/queries/getAllProducts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  title = 'angular guard';

  loading: boolean = false;
  products: any;
  filter = '';
  router = inject(ActivatedRoute);
  private querySubscription = new Subscription;

  constructor(
    // public productsService: ProductsService,
    // public notificationService: NotificationService,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.router.queryParams.subscribe(params => {

      const category = params['category'] || null;
      console.log(category);

      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: GetAllProducts,
          variables: {
            limit: 10,
            category: category,
          },
        })
        .valueChanges.subscribe(({ data, loading }) => {
          this.loading = loading;
          this.products = data.Products.items;
        });
    });
  }


  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
