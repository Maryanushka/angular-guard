import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { AuthService } from '../../../product/services/auth.service';
import { RouterModule } from '@angular/router';
import { BasketComponent } from "../basket/basket.component";



@NgModule({
  declarations: [
		NavigationComponent
	],
  imports: [
    CommonModule,
    RouterModule,
    BasketComponent
],
	exports: [
		NavigationComponent
	],
	providers: [
		AuthService
	]
})
export class NavigationModule { }
