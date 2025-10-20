import { Component, inject, OnInit } from '@angular/core';
import { MainFacade } from '../../../shared/state/main-state/main.facade';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'product-categories',
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.scss',
	standalone: true,
	imports: [CommonModule, RouterModule],
})
export class CategoriesComponent implements OnInit {
	private facade = inject(MainFacade);

	categories$ = this.facade.categories$;
	categoriesLoading$ = this.facade.categoriesLoading$;
	categoriesError$ = this.facade.categoriesError$;

	ngOnInit() {
		this.facade.loadCategories();
	}
}
