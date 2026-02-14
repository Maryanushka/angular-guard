import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MainFacade } from '../shared/state/main-state/main.facade';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { SocialMediaComponent } from '../shared/components/social-media/social-media.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { BasketListComponent } from './components/basket-list/basket-list.component';

@Component({
	selector: 'app-basket-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, RouterModule, NavigationComponent, FooterComponent, SocialMediaComponent, BasketListComponent, OrderFormComponent],
	templateUrl: './basket-page.component.html',
	styleUrl: './basket-page.component.scss',
})
export class BasketPageComponent {
	private facade = inject(MainFacade);

	basket = toSignal(this.facade.basket$, { initialValue: [] });
}
