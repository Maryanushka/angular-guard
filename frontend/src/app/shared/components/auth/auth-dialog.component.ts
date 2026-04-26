import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthFacade } from '@shared';

@Component({
	selector: 'app-auth-dialog',
	standalone: true,
	imports: [CommonModule, DialogModule, SignInComponent, RegisterComponent, ForgotPasswordComponent],
	template: `
		<p-dialog
			[visible]="isVisible()"
			[modal]="true"
			[draggable]="false"
			[resizable]="false"
			[dismissableMask]="true"
			[style]="{ width: '450px' }"
			(visibleChange)="onVisibleChange($event)">
			<ng-template pTemplate="header">
				<div class="text-xl font-bold">{{ mode() === 'login' ? 'Sign In' : mode() === 'register' ? 'Register' : 'Reset Password' }}</div>
			</ng-template>

			<div class="flex flex-col gap-4">
				@if (mode() === 'login') {
					<app-sign-in (switchToRegister)="mode.set('register')" (switchToForgotPassword)="mode.set('forgotPassword')"></app-sign-in>
				} @else if (mode() === 'register') {
					<app-register (switchToLogin)="mode.set('login')"></app-register>
				} @else {
					<app-forgot-password (switchToLogin)="mode.set('login')"></app-forgot-password>
				}
			</div>
		</p-dialog>
	`,
})
export class AuthDialogComponent {
	private authFacade = inject(AuthFacade);

	private showModal = toSignal(this.authFacade.showAuthModal$, { initialValue: false });
	isVisible = signal(false);
	mode = signal<'login' | 'register' | 'forgotPassword'>('login');

	constructor() {
		effect(() => {
			const visible = this.showModal();
			this.isVisible.set(visible);
			if (visible) {
				this.mode.set('login');
			}
		});
	}

	onVisibleChange(visible: boolean) {
		if (!visible) {
			this.isVisible.set(false);
			this.authFacade.closeAuthModal();
		}
	}
}
