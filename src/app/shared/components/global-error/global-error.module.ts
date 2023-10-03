import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorComponent } from './global-error.component';



@NgModule({
  declarations: [
		GlobalErrorComponent
	],
  imports: [
    CommonModule
  ],
	exports: [
		GlobalErrorComponent
	]
})
export class GlobalErrorModule { }
