import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../../product/services/auth.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
	templateUrl: './register.component.html'
})
export class RegisterComponent {
	@Output() switchToLogin = new EventEmitter<void>();
	private fb = inject(FormBuilder);
	/* private authService = inject(AuthService); // Register logic usually goes through same getToken or dedicated method */

	registerForm = this.fb.group({
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
		confirmPassword: ['', Validators.required]
	});

	register() {
		if (this.registerForm.valid) {
			// Current AuthService.getToken handles registration via 'form' type if configured, 
			// or we need to add a register method. 
			// Looking at existing AuthService: getToken with 'form' creates a user. 
			// So we can re-use it or clarify if 'userc' interface matches.
			// Currently 'userc' is IUserCredentials { email, password }. Name is not passed to firebase auth straightforwardly without profile update.
			
			// For now, let's keep it simple and just use email/pass
			/* this.authService.getToken({
				email: this.registerForm.value.email!,
				password: this.registerForm.value.password!
			}, 'form'); */
			console.log('Register feature pending full implementation in AuthService to handle Name profile update');
		}
	}
}
