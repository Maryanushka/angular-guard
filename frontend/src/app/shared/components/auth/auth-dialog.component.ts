import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { AuthFacade } from '@shared';

@Component({
	selector: 'app-auth-dialog',
	standalone: true,
	imports: [CommonModule, DialogModule, SignInComponent, RegisterComponent],
	template: `
		<p-dialog [visible]="isVisible()" [modal]="true" [draggable]="false" [resizable]="false" [dismissableMask]="true" [style]="{ width: '450px' }" (onHide)="close()">
			<ng-template pTemplate="header">
				<div class="text-xl font-bold">{{ isLoginMode() ? 'Sign In' : 'Register' }}</div>
			</ng-template>

			<div class="flex flex-col gap-4">
				@if (isLoginMode()) {
					<app-sign-in (switchToRegister)="switchMode()"></app-sign-in>
				} @else {
					<app-register (switchToLogin)="switchMode()"></app-register>
				}
			</div>
		</p-dialog>
	`,
})
export class AuthDialogComponent {
	private authFacade = inject(AuthFacade);

	private showModal = toSignal(this.authFacade.showAuthModal$, { initialValue: false });
	isVisible = signal(false);
	isLoginMode = signal(true);

	constructor() {
		effect(() => {
			const visible = this.showModal();
			this.isVisible.set(visible);
			if (visible) {
				this.isLoginMode.set(true);
			}
		});
	}

	close() {
		this.authFacade.closeAuthModal();
	}

	switchMode() {
		this.isLoginMode.update((v) => !v);
	}
}
