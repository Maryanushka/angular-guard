import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MainFacade } from '../../../shared/state/main-state/main.facade';
import { GetProductService } from '../../../shared/state/requests/get-product.service';
import type { IProduct } from '../../../shared/types/product.inteface';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	standalone: true,
	imports: [RouterModule, ToastModule, ButtonModule],
})
export class ProductComponent {
	@Input() product!: IProduct;

	private facade = inject(MainFacade);
	private messageService = inject(MessageService);

	addToCart(event: Event): void {
		event.preventDefault();
		event.stopPropagation();

		this.facade.addToBasket(this.product);
		this.messageService.add({
			severity: 'success',
			summary: 'Додано в корзину',
			detail: this.product.title,
		});
	}
}
