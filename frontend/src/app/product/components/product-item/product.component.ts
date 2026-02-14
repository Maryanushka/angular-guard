import { Component, Input } from '@angular/core';
import { IProduct } from '../../../shared/types/product.inteface';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	standalone: true,
	imports: [RouterModule],
})
export class ProductComponent {
	@Input() product: IProduct = {
		_slug: '',
		title: '',
		description: '',
		cover: null,
		categories: [],
	};
}
