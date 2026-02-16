import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MainFacade, NavigationComponent, FooterComponent, SocialMediaComponent } from '@shared';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { BasketListComponent } from './components/basket-list/basket-list.component';

import { TranslatePipe } from '@shared';

@Component({
	selector: 'app-basket-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, RouterModule, NavigationComponent, FooterComponent, SocialMediaComponent, BasketListComponent, OrderFormComponent, TranslatePipe],
	templateUrl: './basket-page.component.html',
	styleUrl: './basket-page.component.scss',
})
export class BasketPageComponent {
	private facade = inject(MainFacade);

	basket = toSignal(this.facade.basket$, { initialValue: [] });
}
