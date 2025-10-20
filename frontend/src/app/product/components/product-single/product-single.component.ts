import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISingleProduct } from '../../../shared/types/product.inteface';
import { ActivatedRoute } from '@angular/router';
import { MainFacade } from '../../../shared/state/main-state/main.facade';
import { NavigationComponent } from '../../../shared/components/navigation/navigation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css'],
  standalone: true,
  imports: [CommonModule, NavigationComponent],
})
export class ProductSingleComponent implements OnInit, OnDestroy {
  private facade = inject(MainFacade);
  private activatedRoute = inject(ActivatedRoute);
  private querySubscription = new Subscription();

  singleProduct$ = this.facade.singleProduct$;
  singleProductLoading$ = this.facade.singleProductLoading$;
  singleProductError$ = this.facade.singleProductError$;

  ngOnInit() {
    this.querySubscription = this.activatedRoute.params.subscribe((params) => {
      this.facade.loadSingleProduct(params['slug']);
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  addToBasket(product: ISingleProduct) {
    this.facade.addToBasket(product);
  }
}
