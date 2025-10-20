import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFacade } from '../../state/main-state/main.facade';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  private facade = inject(MainFacade);

  count$ = this.facade.productsCount$;
  basket$ = this.facade.basket$;
}
