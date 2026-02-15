import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { MainFacade } from '../../../shared/state/main-state/main.facade';
import type { BasketLine } from '../../../shared/types/product.inteface';

@Component({
	selector: 'app-order-form',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule],
	templateUrl: './order-form.component.html',
	styleUrl: './order-form.component.scss',
	providers: [MessageService],
})
export class OrderFormComponent {
	private messageService = inject(MessageService);
	private fb = inject(FormBuilder);
	private facade = inject(MainFacade);

	basket = toSignal(this.facade.basket$, { initialValue: [] as BasketLine[] });

	orderForm = this.fb.nonNullable.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		phone: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		city: ['', Validators.required],
		novaPoshtaBranch: ['', Validators.required],
	});

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
			form.reset();
			this.messageService.add({ severity: 'success', summary: 'Заказ отправлен', detail: 'Мы свяжемся с вами.' });
		} catch (err) {
			console.error('EmailJS failed:', (err as EmailJSResponseStatus).text);
		}
	}
}
