import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { providePrimeNG } from 'primeng/config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './app/environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { productReducer, productKey } from './app/shared/state/main-state/main.reducer';
import { MainEffects } from './app/shared/state/main-state/main.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideSanityClient } from './app/shared/services/sanity-client.token';
import { appThemePreset } from './app/theme/primeng-preset';

bootstrapApplication(AppComponent, {
	providers: [
		provideAnimationsAsync(),
		providePrimeNG({
			ripple: true,
			overlayAppendTo: 'body',
			theme: {
				preset: appThemePreset,
				options: {
					darkModeSelector: '[data-theme="light"]',
					cssLayer: {
						name: 'primeng',
						order: 'theme',
					},
				},
			},
		}),
		provideEffects([MainEffects]),
		provideStore({ [productKey]: productReducer }),
		provideRouter(routes, withEnabledBlockingInitialNavigation()),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(() => getFirestore()),
		provideAuth(() => getAuth()),
		{ provide: APP_BASE_HREF, useValue: '/' },
		provideHttpClient(),
		provideSanityClient,
	],
}).catch((err) => console.error(err));
