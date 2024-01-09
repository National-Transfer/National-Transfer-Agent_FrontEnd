import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

export const routes: Routes = [
    { path: 'login/callback', component: OktaCallbackComponent },
    {
        path: '',
        loadChildren: () => import('./components/routes').then((m) => m.APP_ROUTES),canActivate: [OktaAuthGuard]
    },
];
