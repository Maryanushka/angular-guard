import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

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
				this.notificationService.close()
			})
		}
}
