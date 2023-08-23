import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';

import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss'],
})
export class CreateProductPageComponent {
  notificationTitle = '';

  constructor(
    private productService: ProductsService,
    public notificationService: NotificationService,
  ) {}

  form = new FormGroup({
    title: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    price: new FormControl<number>(0, {
      validators: Validators.required,
    }),
    category: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    image: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.pattern(/^https:\/\/.*\.(jpg|png|webp)$/),
      ],
    }),
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  submit() {
    console.log(this.form.value.title);
    this.productService
      .createProduct({
        title: this.form.value.title as string,
        price: this.form.value.price as number,
        description: this.form.value.image as string,
        image: this.form.value.image as string,
        category: this.form.value.image as string,
      })
      .subscribe(
        // 	{
        // 	next(value) {

        // 	},
        // 	error(err) {
        // 		console.log(err);

        // 	},
        // }
        (w) => {
          console.log(w);

          this.notificationTitle = 'Product created successfully';
          this.notificationService.open();
        },
      );
  }
}
