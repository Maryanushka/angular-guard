import { Route } from '@angular/router';
import { AuthenticaionGuard } from './product/services/authenticaion.guard';

export const routes: Route[] = [
	{
		path: '',
		loadComponent: () => import('./home/components/home.component').then((m) => m.HomeComponent),
	},
	{
		path: 'signin',
		loadComponent: () => import('./signin/signin-page.component').then((m) => m.SigninPageComponent),
	},
	{
		path: 'basket',
		loadComponent: () => import('./basket-page/basket-page.component').then((m) => m.BasketPageComponent),
	},
	{
		path: 'products',
		children: [
			{
				path: '',
				loadComponent: () => import('./product/components/product-page/product-page.component').then((m) => m.ProductPageComponent),
			},
			{
				path: 'category/:category',
				loadComponent: () => import('./product/components/product-page/product-page.component').then((m) => m.ProductPageComponent),
			},
			{
				path: ':slug',
				loadComponent: () => import('./product/components/product-single/product-single.component').then((m) => m.ProductSingleComponent),
			},
		],
	},
	{
		path: 'about',
		loadComponent: () => import('./about/components/about-page.component').then((m) => m.AboutPageComponent),
	},
	{
		path: 'profile',
		loadComponent: () => import('./profile/profile-page.component').then((m) => m.ProfilePageComponent),
		canActivate: [AuthenticaionGuard],
		data: { roles: ['user'] },
	},
];
