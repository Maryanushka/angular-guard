import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, inject } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';

const uri =
  'https://graphql.prepr.io/ec5758c6b9c92bbf9656e7a6a78f2dc5761c536cf1272f42931b050e0b620b88';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({ uri: uri }),
        cache: new InMemoryCache(),
        // other options...
      };
    }),
  ],
};
