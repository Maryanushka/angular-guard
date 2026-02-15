import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SignInComponent, RegisterComponent, NavigationComponent, FooterComponent } from '@shared';

@Component({
	selector: 'app-signin-page',
	standalone: true,
	imports: [CommonModule, CardModule, SignInComponent, RegisterComponent, NavigationComponent, FooterComponent],
	templateUrl: './signin-page.component.html',
})
export class SigninPageComponent {
	isLoginMode = signal(true);

	switchMode() {
		this.isLoginMode.update((v) => !v);
	}
}
