import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map } from 'rxjs';
import { MainFacade, NavigationComponent, SocialMediaComponent, ObserveInViewDirective, FooterComponent, TranslatePipe } from '@shared';
import { ProductComponent } from '../product-item/product.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const PAGE_SIZE = 10;

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		NavigationComponent,
		SocialMediaComponent,
		ProductComponent,
		CategoriesComponent,
		ObserveInViewDirective,
		ProgressSpinnerModule,
		FooterComponent,
		TranslatePipe,
	],
})
export class ProductPageComponent implements OnInit {
	private facade = inject(MainFacade);
	private route = inject(ActivatedRoute);
	private destroyRef = inject(DestroyRef);

	private category: string | null = null;

	products$ = this.facade.products$;
	$products = toSignal(this.facade.products$, { initialValue: [] });
	$total = toSignal(this.facade.productsTotal$, { initialValue: 0 });
	$loading = toSignal(this.facade.productsLoading$, { initialValue: false });
	loading$ = this.facade.productsLoading$;
	error$ = this.facade.productsError$;

	readonly pageSize = PAGE_SIZE;

	ngOnInit(): void {
		this.route.paramMap
			.pipe(
				map((params) => params.get('category')),
				distinctUntilChanged(),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe((category) => {
				this.category = category;
				this.facade.loadProducts(this.category, PAGE_SIZE, 0);
			});
	}

	loadMore(): void {
		const products = this.$products();
		const total = this.$total();
		const loading = this.$loading();
		if (loading || products.length >= total || total === 0) return;
		this.facade.loadProducts(this.category, PAGE_SIZE, products.length);
	}
}
