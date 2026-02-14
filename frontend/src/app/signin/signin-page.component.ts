import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../product/services/auth.service';
import { IUserCredentials } from '../shared/types/userCredential.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-signin-page',
	templateUrl: './signin-page.component.html',
	styleUrls: ['./signin-page.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class SigninPageComponent {
	auth = inject(AuthService);
	router = inject(Router);

	form = new FormGroup({
		email: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
		password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
	});

	get email() {
		return this.form.controls.email as FormControl;
	}
	get password() {
		return this.form.controls.password as FormControl;
	}

	submit() {
		console.log(this.form.value);
		this.auth.getToken(this.form.value as IUserCredentials, 'form');
	}

	loginWithGoogle() {
		this.auth.getToken(null, 'google');
	}
}
