import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductsModule } from './product/products.module';
import { AboutModule } from './about/about.module';
import { SigninModule } from './signin/signin.module';
import { NavigationModule } from './shared/components/navigation/navigation.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		ProductsModule,
		AboutModule,
		SigninModule,
		NavigationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
