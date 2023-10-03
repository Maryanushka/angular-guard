import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
		NavigationComponent
	],
  imports: [
    CommonModule,
		RouterModule,
  ],
	exports: [
		NavigationComponent
	],
	providers: [
		AuthService
	]
})
export class NavigationModule { }
