import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './app/environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { inject, isDevMode } from '@angular/core';
import {
  productReducer,
  productKey,
} from './app/shared/state/main-state/main.reducer';
import { MainEffects } from './app/shared/state/main-state/main.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// https://calendar.google.com/calendar/render?action=TEMPLATE&text=Analysis%20for%20{UserName}&details=Please%20review%20uploads...&dates={START_UTC}/{END_UTC}

bootstrapApplication(AppComponent, {
  providers: [
    provideEffects([MainEffects]),
    provideStore({ [productKey]: productReducer }),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    { provide: APP_BASE_HREF, useValue: '/' },
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
