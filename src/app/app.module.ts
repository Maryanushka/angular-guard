import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductsModule } from './product/products.module';
import { AboutModule } from './about/about.module';
import { SigninModule } from './signin/signin.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { GraphQLModule } from './graphql.module';
import { HomeModule } from './home/home.module';
import { Router, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './shared/state/main-state/main.effects';
import { APP_BASE_HREF } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BasketPageModule } from './basket-page/basket-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    HomeModule,
    AboutModule,
    SigninModule,
    BasketPageModule,
    GraphQLModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(),
      maxAge: 25,
      connectInZone: true,
    }),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
