import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MainFacade } from '../../../shared/state/main-state/main.facade';
import { NavigationComponent } from '../../../shared/components/navigation/navigation.component';
import { SocialMediaComponent } from '../../../shared/components/social-media/social-media.component';
import { ProductComponent } from '../product-item/product.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss'],
	standalone: true,
	providers: [MessageService],
	imports: [CommonModule, NavigationComponent, SocialMediaComponent, ProductComponent, CategoriesComponent],
})
export class ProductPageComponent implements OnInit, OnDestroy {
	private facade = inject(MainFacade);
	private router = inject(ActivatedRoute);
	private querySubscription = new Subscription();

	products$ = this.facade.products$;
	loading$ = this.facade.productsLoading$;
	error$ = this.facade.productsError$;
	filter = '';

	ngOnInit() {
		this.querySubscription = this.router.queryParams.subscribe((params) => {
			const category = params['category'] || null;
			this.facade.loadProducts(category, 10);
		});
	}

	ngOnDestroy() {
		this.querySubscription.unsubscribe();
	}
}
