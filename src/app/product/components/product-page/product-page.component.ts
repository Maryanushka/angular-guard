import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { IProduct } from '../../components/product-item/models/product.inteface';
import { Observable, Subscription, tap } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GetAllProducts } from '../../../shared/queries/getAllProducts';

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
  private querySubscription = new Subscription;

  constructor(
    // public productsService: ProductsService,
    // public notificationService: NotificationService,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GetAllProducts
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.products = data.Products.items;
      });
  }


  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
