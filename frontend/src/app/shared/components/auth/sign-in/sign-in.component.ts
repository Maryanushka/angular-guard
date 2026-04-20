import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { AuthFacade } from '@shared';
import { AuthService } from '@shared';
import { Auth, RecaptchaVerifier } from '@angular/fire/auth';

import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
	selector: 'app-sign-in',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, DividerModule, TranslatePipe],
	templateUrl: './sign-in.component.html',
})
export class SignInComponent {
	private authFacade = inject(AuthFacade);
	private authService = inject(AuthService);
	private auth = inject(Auth);
	private fb = inject(FormBuilder);
	private router = inject(Router);

	isPhoneAuth = false;
	verificationCodeSent = false;
	phoneNumber = '';
	otp = '';
	recaptchaVerifier?: RecaptchaVerifier;

	loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
	});

	loginGoogle() {
		this.authFacade.loginGoogle();
	}

	loginEmail() {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;
			if (email && password) {
				this.authFacade.loginEmail(email, password);
			}
		}
	}

	goToRegister() {
		this.router.navigate(['/register']);
	}

	goToForgotPassword() {
		this.router.navigate(['/forgot-password']);
	}

	togglePhoneAuth() {
		this.isPhoneAuth = true;
		setTimeout(() => {
			if (!this.recaptchaVerifier) {
				this.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', {
					size: 'normal',
					callback: (_response: string) => {
						// reCAPTCHA solved
					},
				});
				this.recaptchaVerifier.render();
			}
		}, 100);
	}

	async sendCode() {
		try {
			if (!this.recaptchaVerifier) throw new Error('Recaptcha not initialized');
			await this.authService.startPhoneSignIn(this.phoneNumber, this.recaptchaVerifier);
			this.verificationCodeSent = true;
		} catch (error) {
			console.error(error);
		}
	}

	async verifyCode() {
		try {
			await this.authService.verifyOtp(this.otp);
			this.authFacade.closeAuthModal();
		} catch (error) {
			console.error(error);
		}
	}
}
