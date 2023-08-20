import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUserCredentials } from '../../shared/types/userCredential.interface';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent {

	constructor(
		public auth: AuthService
	)  {

	}

	form = new FormGroup({
		email: new FormControl<string>('john@mail.com', [
			Validators.required,
			Validators.minLength(6)
		]),
		password: new FormControl<string>('changeme', [
			Validators.required,
			Validators.minLength(6)
		])
	})

	get email() {
		return this.form.controls.email as FormControl
	}
	get password() {
		return this.form.controls.password as FormControl
	}

	submit() {
		console.log(this.form.value);

		// here send request to postman https://dummyjson.com/docs/auth
		// get token store to localstorage

		this.auth.getToken(this.form.value as IUserCredentials)
		// this.productService.createProduct({
		// 	title: this.form.value.title as string,
		// 	price: 13.5,
		// 	description: 'lorem ipsum set',
		// 	image: 'https://i.pravatar.cc',
		// 	category: 'electronic'
		// }).subscribe( () => {
		// 	this.notificationService.close()
		// })
	}
}
