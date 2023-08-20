import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';

import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss']
})
export class CreateProductPageComponent {
	constructor(
		private productService: ProductsService,
		public notificationService: NotificationService
		) {

	}

	  form = new FormGroup({
			title: new FormControl<string>('', [
				Validators.required,
				Validators.minLength(6)
			])
		})

		get title() {
			return this.form.controls.title as FormControl
		}

		submit() {
			console.log(this.form.value.title);
			this.productService.createProduct({
				title: this.form.value.title as string,
				price: 13.5,
				description: 'lorem ipsum set',
				image: 'https://i.pravatar.cc',
				category: 'electronic'
			}).subscribe( () => {
				this.notificationService.open()
				delay(2000)
				this.notificationService.close()
			})
		}
}
