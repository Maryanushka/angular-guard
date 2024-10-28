import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GetCategories } from '../../../shared/queries/getCategory';
import { MainFacade } from '../../../shared/state/main-state/main.facade';

@Component({
  selector: 'product-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private facade = inject(MainFacade);

  categories$ = this.facade.categories$;
  categoriesLoading$ = this.facade.categoriesLoading$;
  categoriesError$ = this.facade.categoriesError$;

  ngOnInit() {
    this.facade.loadCategories();
  }
}
