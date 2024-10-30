import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasketPageComponent } from './basket-page.component';

const routes = [
  {
    path: 'basket',
    component: BasketPageComponent,
  },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BasketPageModule { }
