import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { MainFacade } from '../../../shared/state/main-state/main.facade';
import type { BasketLine, IProduct } from '../../../shared/types/product.inteface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-basket-list',
	standalone: true,
	imports: [CommonModule, CardModule, ButtonModule, InputNumberModule, ToastModule],
	templateUrl: './basket-list.component.html',
	providers: [MessageService],
})
export class BasketListComponent {
	private facade = inject(MainFacade);
	private messageService = inject(MessageService);

	$basket = toSignal(this.facade.basket$, { initialValue: [] as BasketLine[], equal: () => false });
  $total = computed(() => this.$basket().reduce((sum, line) => sum + this.lineTotal(line), 0));

	lineTotal(line: BasketLine): number {
		const price = parseFloat(line.product.price ?? '0');
		return price * line.quantity;
	}

	removeOne(product: IProduct): void {
		this.messageService.add({
			severity: 'info',
			summary: 'Видалено з корзини',
			detail: product.title,
		});
		this.facade.removeFromBasket(product);
	}

	addOne(product: IProduct): void {
		this.messageService.add({
			severity: 'success',
			summary: 'Додано в корзину',
			detail: product.title,
		});
		this.facade.addToBasket(product);
	}

	removeProduct(line: BasketLine): void {
		this.messageService.add({
			severity: 'warn',
			summary: 'Видалено товар з корзини',
			detail: line.product.title,
		});
		this.facade.removeProduct(line);
	}
}
