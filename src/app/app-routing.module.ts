import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-pages/product-page/product-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { CreateProductPageComponent } from './pages/product-pages/create-product-page/create-product-page.component';
import { AuthenticaionGuard } from './services/authenticaion.guard';

const routes: Routes = [
  { path: '', component: ProductPageComponent },
  { path: 'about', component: AboutPageComponent },
  {
    path: 'signin',
    // canActivate: [!AuthenticaionGuard],
    component: SigninPageComponent,
  },
  {
    path: 'create-product',
    canActivate: [AuthenticaionGuard],
    component: CreateProductPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
