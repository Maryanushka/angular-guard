import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFacade } from '../../state/main-state/main.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { SanityImageService } from '../../services/sanity-image.service';

@Component({
	selector: 'app-basket',
	standalone: true,
	imports: [CommonModule, RouterModule, ButtonModule],
	templateUrl: './basket.component.html',
	styleUrl: './basket.component.scss',
})
export class BasketComponent {
	private facade = inject(MainFacade);
	private sanityImage = inject(SanityImageService);

	$count = toSignal(this.facade.basketCount$, { initialValue: 0 });
	$basket = toSignal(this.facade.basket$, { initialValue: [] });

	getImageUrl(cover: any): string {
		return this.sanityImage.getResizedUrl(cover, 160);
	}
}
