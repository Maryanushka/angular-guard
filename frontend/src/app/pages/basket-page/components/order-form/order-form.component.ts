import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '@env/environment';
import { MainFacade, AuthFacade, UserFacade, IOrder, IOrderItem, BasketLine, TranslatePipe } from '@shared';
import { take } from 'rxjs';

import { CommonModule, AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-order-form',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, AsyncPipe, ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, TranslatePipe],
	templateUrl: './order-form.component.html',
	styleUrl: './order-form.component.scss',
	providers: [MessageService],
})
export class OrderFormComponent {
	private messageService = inject(MessageService);
	private fb = inject(FormBuilder);
	private facade = inject(MainFacade);
	private authFacade = inject(AuthFacade);
	private userFacade = inject(UserFacade);

	basket = toSignal(this.facade.basket$, { initialValue: [] as BasketLine[] });
	isLoggedIn$ = this.authFacade.isLoggedIn$;

	orderForm = this.fb.nonNullable.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		phone: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		city: ['', Validators.required],
		novaPoshtaBranch: ['', Validators.required],
	});

	login() {
		this.authFacade.openAuthModal();
	}

	async onSubmit() {
		const form = this.orderForm;
		if (form.invalid) {
			form.markAllAsTouched();
			return;
		}
		const value = form.getRawValue();
		const lines = this.basket();
		const orderLines = lines.map(({ product, quantity }) => `${product.title} × ${quantity} — ${(parseFloat(product.price ?? '0') || 0).toFixed(2)}`);
		const orderItems = orderLines.join('\n');
		const basketTotal = lines.reduce((sum, { product, quantity }) => sum + (parseFloat(product.price ?? '0') || 0) * quantity, 0);

		const { emailjs: config } = environment;
		const templateParams = {
			Name: `${value.firstName} ${value.lastName}`.trim(),
			FirstName: value.firstName,
			LastName: value.lastName,
			Email: value.email,
			Phone: value.phone,
			City: value.city,
			NovaPoshtaBranch: value.novaPoshtaBranch,
			OrderItems: orderItems,
			BasketTotal: basketTotal.toFixed(2),
		};

		try {
			await emailjs.send(config.serviceId, config.templateId, templateParams, { publicKey: config.publicKey });

			// Store order in user profile if logged in
			this.authFacade.user$.pipe(take(1)).subscribe((user) => {
				if (user?.uid) {
					const items: IOrderItem[] = lines.map((line) => ({
						productSlug: line.product._slug,
						productTitle: line.product.title,
						quantity: line.quantity,
						price: parseFloat(line.product.price ?? '0') || 0,
						cover: line.product.cover,
					}));

					this.userFacade.submitOrder(user.uid, {
						date: new Date().toISOString(),
						total: basketTotal,
						items: items,
					});
				}
			});

			form.reset();
			this.messageService.add({ severity: 'success', summary: 'Заказ отправлен', detail: 'Мы свяжемся с вами.' });
		} catch (err) {
			console.error('EmailJS failed:', (err as EmailJSResponseStatus).text);
		}
	}
}
