import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { IProduct } from '../../../shared/types/product.inteface';
import { Observable, Subscription, tap } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GetAllProducts } from '../../../shared/queries/getAllProducts';
import { ActivatedRoute } from '@angular/router';
import { MainFacade } from '../../../shared/state/main-state/main.facade';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  private facade = inject(MainFacade);
  private router = inject(ActivatedRoute);
  private querySubscription = new Subscription;

  products$ = this.facade.products$;
  loading$ = this.facade.productsLoading$;
  error$ = this.facade.productsError$;
  filter = '';

  ngOnInit() {
    this.querySubscription = this.router.queryParams.subscribe(params => {
      const category = params['category'] || null;
      this.facade.loadProducts(category, 10);
    });
  }


  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
