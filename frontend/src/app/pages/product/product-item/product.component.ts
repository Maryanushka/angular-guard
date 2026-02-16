import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MainFacade, SanityImageService, IProduct, TranslateService, TranslatePipe } from '@shared';
import { GetProductService } from '@shared/state/requests/get-product.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	standalone: true,
	imports: [RouterModule, ToastModule, ButtonModule, TranslatePipe],
})
export class ProductComponent {
	@Input() product!: IProduct;

	private facade = inject(MainFacade);
	private messageService = inject(MessageService);
	private sanityImage = inject(SanityImageService);
	private translate = inject(TranslateService);

	get imageUrl(): string | null {
		if (!this.product?.cover) return null;
		// Requesting 400px width for listing thumbnails
		return this.sanityImage.getResizedUrl(this.product.cover, 400);
	}

	addToCart(event: Event): void {
		event.preventDefault();
		event.stopPropagation();

		this.facade.addToBasket(this.product);
		this.messageService.add({
			severity: 'success',
			summary: this.translate.get('BASKET.TOAST.ADDED'),
			detail: this.product.title,
		});
	}
}
