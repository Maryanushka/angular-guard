import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../product/services/auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';

@Component({
	selector: 'app-auth-dialog',
	standalone: true,
	imports: [CommonModule, DialogModule, SignInComponent, RegisterComponent],
	template: `
		<p-dialog 
			[(visible)]="isVisible" 
			[modal]="true" 
			[draggable]="false" 
			[resizable]="false" 
			[dismissableMask]="true"
			[style]="{ width: '450px' }"
			(onHide)="close()">
			<ng-template pTemplate="header">
				<div class="text-xl font-bold">{{ isLoginMode ? 'Sign In' : 'Register' }}</div>
			</ng-template>
			
			<div class="flex flex-col gap-4">
				@if (isLoginMode) {
					<app-sign-in (switchToRegister)="switchMode()"></app-sign-in>
				} @else {
					<app-register (switchToLogin)="switchMode()"></app-register>
				}
			</div>
		</p-dialog>
	`
})
export class AuthDialogComponent implements OnInit {
	private authService = inject(AuthService);
	
	isVisible = false;
	isLoginMode = true;

	ngOnInit() {
		this.authService.showAuthModal$.subscribe(visible => {
			this.isVisible = visible;
			if (visible) {
				this.isLoginMode = true; // Reset to login when opening
			}
		});
	}

	close() {
		this.authService.closeAuthModal();
	}

	switchMode() {
		this.isLoginMode = !this.isLoginMode;
	}
}
