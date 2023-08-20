import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { IProduct } from '../models/product.inerface';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  title = 'angular guard';

	// products:  IProduct[] = [];
	products$!:  Observable<IProduct[]>
	loading = false
	filter = ''

	constructor(
		public productsService: ProductsService,
		public notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.loading = true
		this.products$ = this.productsService.getAll().pipe(
			tap(() => this.loading = false)
		)
		this.productsService.getAll().subscribe(() => 
			this.loading = false
		)
	}	
}
