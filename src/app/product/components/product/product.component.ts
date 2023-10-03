import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product.inerface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: IProduct = {
    category: '',
    id: 0,
    image: '',
    price: 0,
    description: '',
    title: '',
  };

  isDetailsActive = false;
  detailsButtonText = 'Show details';

  toggleDetails() {
    this.isDetailsActive = !this.isDetailsActive;
    this.isDetailsActive
      ? (this.detailsButtonText = 'Hide details')
      : (this.detailsButtonText = 'Show details');
  }
}
