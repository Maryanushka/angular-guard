import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GetCategories } from '../../../shared/queries/getCategory';

@Component({
  selector: 'product-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private querySubscription = new Subscription;
  private apollo: Apollo = inject(Apollo);
  loading: boolean = false;
  list: any;

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GetCategories
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.list = data.Categories.items;
      });
  }


  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
