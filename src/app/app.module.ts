import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterProductsPipe } from './pipes/filter-products.pipe';

import { FocusDirective } from './directives/focus.directive';

import { ModalComponent } from './components/modal/modal.component';
import { ProductComponent } from './components/product/product.component';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CreateProductPageComponent } from './pages/create-product-page/create-product-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterProductsPipe,

    FocusDirective,

    ModalComponent,
    ProductComponent,
    GlobalErrorComponent,
    CreateProductComponent,
    AboutPageComponent,
    ProductPageComponent,
    NavigationComponent,
    CreateProductPageComponent,
    SigninPageComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
