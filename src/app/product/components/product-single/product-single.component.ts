import { Component, inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GetSingleProduct } from '../../../shared/queries/getSingleProduct';
import { ISingleProduct } from '../../../shared/types/product.inteface';
import { ActivatedRoute, Router } from '@angular/router';
import { MainFacade } from '../../../shared/state/main-state/main.facade';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {
  private facade = inject(MainFacade);
  private activatedRoute = inject(ActivatedRoute);
  private querySubscription = new Subscription;

  singleProduct$ = this.facade.singleProduct$;
  singleProductLoading$ = this.facade.singleProductLoading$;
  singleProductError$ = this.facade.singleProductError$;

  ngOnInit() {
    this.querySubscription = this.activatedRoute.params.subscribe(params => {
      this.facade.loadSingleProduct(params['slug']);
    });
  }


  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
