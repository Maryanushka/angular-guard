import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../environments/environment';
import { MainFacade } from '../shared/state/main-state/main.facade';
import { ISingleProduct } from '../shared/types/product.inteface';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { SocialMediaComponent } from '../shared/components/social-media/social-media.component';

@Component({
	selector: 'app-basket-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, RouterModule, ReactiveFormsModule, NavigationComponent, FooterComponent, SocialMediaComponent],
	templateUrl: './basket-page.component.html',
	styleUrl: './basket-page.component.scss',
})
export class BasketPageComponent {
	private facade = inject(MainFacade);
	private fb = inject(FormBuilder);

	basket = toSignal(this.facade.basket$, { initialValue: [] as ISingleProduct[] });

	orderForm = this.fb.nonNullable.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		phone: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		city: ['', Validators.required],
		novaPoshtaBranch: ['', Validators.required],
	});

	removeOne(product: ISingleProduct) {
		this.facade.removeOneFromBasket(product);
	}

	addOne(product: ISingleProduct) {
		this.facade.addToBasket(product);
	}

	removeAll(product: ISingleProduct) {
		const items = this.basket() ?? [];
		for (const p of items) {
			if (p._slug === product._slug) this.facade.removeOneFromBasket(p);
		}
	}

	async onSubmit() {
		if (this.orderForm.invalid) {
			this.orderForm.markAllAsTouched();
			return;
		}
		const value = this.orderForm.getRawValue();
		const items = this.basket() ?? [];
		const basketTotals = items.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);

		const { emailjs: config } = environment;
		const templateParams = {
			FirstName: value.firstName,
			LastName: value.lastName,
			Email: value.email,
			Phone: value.phone,
			City: value.city,
			NovaPoshtaBranch: value.novaPoshtaBranch,
			BasketTotals: basketTotals.toFixed(2),
		};

		try {
			await emailjs.send(config.serviceId, config.templateId, templateParams, { publicKey: config.publicKey });
			this.orderForm.reset();
		} catch (err) {
			console.error('EmailJS failed:', (err as EmailJSResponseStatus).text);
		}
	}
}
