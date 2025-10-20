import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BasketPageComponent } from './basket-page/basket-page.component';
import { HomeComponent } from './home/components/home.component';
import { ProductPageComponent } from './product/components/product-page/product-page.component';
import { ProductSingleComponent } from './product/components/product-single/product-single.component';
import { AboutPageComponent } from './about/components/about-page.component';

export const routes: Route[] = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'basket',
		component: BasketPageComponent,
	},
	// {
	//   path: 'create-product',
	//   canActivate: [AuthenticaionGuard],
	//   component: CreateProductPageComponent,
	//   data: {roles: ['user']},
	// },
	{
		path: 'products',
		component: ProductPageComponent,
	},
	{
		path: 'products/:slug',
		component: ProductSingleComponent,
	},
	{
		path: 'about',
		component: AboutPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
