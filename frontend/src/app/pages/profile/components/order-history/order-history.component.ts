import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserFacade, MainFacade, IOrder, IProduct } from '@shared';
import { Router } from '@angular/router';

import { TranslatePipe } from '@shared';

@Component({
	selector: 'app-order-history',
	standalone: true,
	imports: [CommonModule, TableModule, ButtonModule, TranslatePipe],
	templateUrl: './order-history.component.html',
})
export class OrderHistoryComponent {
	private userFacade = inject(UserFacade);
	private mainFacade = inject(MainFacade);
	private router = inject(Router);

	orders$ = this.userFacade.orders$;
	loading$ = this.userFacade.loading$;

	getItemsText(order: IOrder): string {
		return order.items.map((i) => i.productTitle).join(', ');
	}

	reOrder(order: IOrder) {
		order.items.forEach((item) => {
			const product: IProduct = {
				title: item.productTitle,
				price: item.price.toString(),
				_slug: item.productSlug,
				description: '', // Placeholder
				categories: [], // Placeholder
				cover: item.cover || null,
			};

			for (let i = 0; i < item.quantity; i++) {
				this.mainFacade.addToBasket(product);
			}
		});

		this.router.navigate(['/basket']);
	}
}
