import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent {
	form = new FormGroup({
		name: new FormControl<string>('kminchelle', [
			Validators.required,
			Validators.minLength(6)
		]),
		password: new FormControl<string>('0lelplR', [
			Validators.required,
			Validators.minLength(6)
		])
	})

	get name() {
		return this.form.controls.name as FormControl
	}
	get password() {
		return this.form.controls.password as FormControl
	}

	submit() {
		console.log(this.form.value.name);

		// here send request to postman https://dummyjson.com/docs/auth
		// get token store to localstorage

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
