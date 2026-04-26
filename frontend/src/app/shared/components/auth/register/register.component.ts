import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { AuthFacade } from '@shared';
import { MessageService } from 'primeng/api';

import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, DividerModule, TranslatePipe],
	templateUrl: './register.component.html',
})
export class RegisterComponent {
	private fb = inject(FormBuilder);
	private authFacade = inject(AuthFacade);
	private messageService = inject(MessageService);
	private router = inject(Router);

	registerForm = this.fb.group({
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
		confirmPassword: ['', Validators.required],
	});

	register() {
		if (this.registerForm.invalid) return;

		const { name, email, password, confirmPassword } = this.registerForm.value;

		if (password !== confirmPassword) {
			this.messageService.add({
				severity: 'error',
				summary: 'Error',
				detail: 'Passwords do not match',
			});
			return;
		}

		this.authFacade.register(name!, email!, password!);
	}

	loginGoogle() {
		this.authFacade.loginGoogle();
	}

	goToLogin() {
		this.authFacade.closeAuthModal();
		this.router.navigate(['/signin']);
	}
}
