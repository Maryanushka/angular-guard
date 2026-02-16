import { Component, inject, OnInit } from '@angular/core';
import { MainFacade } from '@shared';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslatePipe } from '@shared';

@Component({
	selector: 'product-categories',
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.scss',
	standalone: true,
	imports: [CommonModule, RouterModule, TranslatePipe],
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
