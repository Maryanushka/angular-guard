import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticaionGuard } from './services/authenticaion.guard';
import { CreateProductPageComponent } from './components/create-product/create-product-page.component';
import { ProductComponent } from './components/product/product.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { RouterModule } from '@angular/router';
import { GlobalErrorModule } from '../shared/components/global-error/global-error.module';
import { NotificationModule } from '../shared/components/notification/notification.module';
import { FocusDirective } from '../shared/directives/focus.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorService } from '../shared/services/error.service';

const routes = [
	{
    path: 'create-product',
    canActivate: [AuthenticaionGuard],
    component: CreateProductPageComponent,
    data: {roles: ['user']},
  },
	{
    path: '',
    component: ProductPageComponent,
  },
]

@NgModule({
  declarations: [
		ProductComponent,
		ProductPageComponent,
		CreateProductPageComponent,
		FilterProductsPipe,
		FocusDirective
	],
  imports: [
    CommonModule,
		GlobalErrorModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NotificationModule,
		RouterModule.forChild(routes)
  ],
	providers: [
		ErrorService
	]
})
export class ProductsModule { }
