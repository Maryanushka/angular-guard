import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GetSingleProduct } from '../../../shared/queries/getSingleProduct';
import { ISingleProduct } from '../../../shared/types/product.inteface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {
  loading = false
  product: ISingleProduct = {
    _slug: '',
    title: '',
    description: '',
    cover: [],
    categories: [],
    content: [],
    seo: null
  };
  filter = '';
  private querySubscription = new Subscription;
  slug: string;

  constructor(private apollo: Apollo, private router: Router, private activatedRoute:ActivatedRoute) {
    this.slug = activatedRoute.snapshot.params['slug'];
  }

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GetSingleProduct,
        variables: {
          slug: this.slug
        }
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.product = data.Product;
      });
  }


  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
