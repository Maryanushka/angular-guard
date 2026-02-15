import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../../../product/services/auth.service';
import { RecaptchaVerifier } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';
import { AuthFacade } from '../../../state/auth-state/auth.facade';

@Component({
	selector: 'app-sign-in',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, DividerModule],
	templateUrl: './sign-in.component.html'
})
export class SignInComponent {
	@Output() switchToRegister = new EventEmitter<void>();
	
	private authFacade = inject(AuthFacade);
	private authService = inject(AuthService);
	private auth = inject(Auth);
	private fb = inject(FormBuilder);

	isPhoneAuth = false;
	verificationCodeSent = false;
	phoneNumber = '';
	otp = '';
	recaptchaVerifier: any;

	loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required]
	});

	loginGoogle() {
		this.authFacade.loginGoogle();
	}

	loginEmail() {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;
			this.authFacade.loginEmail(email!, password!);
		}
	}

	togglePhoneAuth() {
		this.isPhoneAuth = true;
		setTimeout(() => {
			if (!this.recaptchaVerifier) {
				this.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', {
					'size': 'normal',
					'callback': (response: any) => {
						// reCAPTCHA solved
					}
				});
				this.recaptchaVerifier.render();
			}
		}, 100);
	}

	async sendCode() {
		try {
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
