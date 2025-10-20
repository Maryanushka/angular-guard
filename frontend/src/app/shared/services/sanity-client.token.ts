import { InjectionToken } from '@angular/core';
import { createClient, type SanityClient } from '@sanity/client';
import { environment } from '../../environments/environment';

export const SANITY_CLIENT = new InjectionToken<SanityClient>('SANITY_CLIENT');

export function sanityClientFactory(): SanityClient {
  return createClient({
    projectId: environment.projectId,
    dataset: environment.dataset,
    apiVersion: environment.apiVersion,
    useCdn: environment.useCdn,
  });
}

export const provideSanityClient = {
  provide: SANITY_CLIENT,
  useFactory: sanityClientFactory,
};
