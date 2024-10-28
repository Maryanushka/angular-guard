import { Component, Input } from '@angular/core';
import { IProduct } from '../../../shared/types/product.inteface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: IProduct = {
    _slug: '',
    title: '',
    description: '',
    cover: [],
    categories: [],
  };
}
