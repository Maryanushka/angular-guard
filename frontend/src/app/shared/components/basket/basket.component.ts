import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFacade } from '../../state/main-state/main.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { SanityImageService, ISanityImage } from '@shared';

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

	getImageUrl(cover: ISanityImage | string | null | undefined): string {
		return this.sanityImage.getResizedUrl(cover, 160);
	}
}
