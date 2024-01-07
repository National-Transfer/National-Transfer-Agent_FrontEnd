import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
<<<<<<< HEAD
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), provideHttpClient()]
=======
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './auth/auth.interceptor';
import OktaAuth from '@okta/okta-auth-js';
import { OktaAuthModule } from '@okta/okta-angular';
import { environment } from '../environments/environment.development';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-12637298.okta.com/oauth2/default',
  clientId: '0oae6q7wvhoY28oYV5d7',
  redirectUri: environment.redirectUri + '/login/callback',
  responseType: ['token', 'id_token'],
  pkce: true,
});


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(withInterceptors([authInterceptor])),provideAnimations(),
  provideHttpClient(withFetch()), provideHttpClient(), importProvidersFrom(OktaAuthModule.forRoot({ oktaAuth })),]
>>>>>>> 120ca0a2361b4fc1b2c2f66e1aec58a6e7cbd051
};
