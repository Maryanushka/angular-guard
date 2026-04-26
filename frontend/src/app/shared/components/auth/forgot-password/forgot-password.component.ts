import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthFacade, TranslatePipe } from '@shared';

@Component({
	selector: 'app-forgot-password',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, TranslatePipe],
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
	private fb = inject(FormBuilder);
	private authFacade = inject(AuthFacade);
	private router = inject(Router);

	forgotPasswordForm = this.fb.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
	});

	onSubmit() {
		if (this.forgotPasswordForm.invalid) {
			this.forgotPasswordForm.markAllAsTouched();
			return;
		}

		const email = this.forgotPasswordForm.controls.email.value;
		this.authFacade.resetPassword(email);
		this.goToLogin();
	}

	goToLogin() {
		this.authFacade.closeAuthModal();
		this.router.navigate(['/signin']);
	}
}
