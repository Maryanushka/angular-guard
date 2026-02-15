import { Route } from '@angular/router';
import { AuthenticationGuard } from '@shared';

export const routes: Route[] = [
	{
		path: '',
		loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
	},
	{
		path: 'signin',
		loadComponent: () => import('./pages/signin/signin-page.component').then((m) => m.SigninPageComponent),
	},
	{
		path: 'basket',
		loadComponent: () => import('./pages/basket-page/basket-page.component').then((m) => m.BasketPageComponent),
	},
	{
		path: 'products',
		children: [
			{
				path: '',
				loadComponent: () => import('./pages/product/product-page/product-page.component').then((m) => m.ProductPageComponent),
			},
			{
				path: 'category/:category',
				loadComponent: () => import('./pages/product/product-page/product-page.component').then((m) => m.ProductPageComponent),
			},
			{
				path: ':slug',
				loadComponent: () => import('./pages/product/product-single/product-single.component').then((m) => m.ProductSingleComponent),
			},
		],
	},
	{
		path: 'about',
		loadComponent: () => import('./pages/about/about-page.component').then((m) => m.AboutPageComponent),
	},
	{
		path: 'profile',
		loadComponent: () => import('./pages/profile/profile-page.component').then((m) => m.ProfilePageComponent),
		canActivate: [AuthenticationGuard],
		data: { roles: ['user'] },
	},
];
