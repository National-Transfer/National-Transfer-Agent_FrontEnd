import { Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TransfersHistoriqueComponent } from './components/transfers-historique/transfers-historique.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProspectsComponent } from './components/prospects/prospects.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path: '', component: NavigationComponent, children: [
            {
                path: 'home', component: HomePageComponent
            },
            {
                path: 'clients', component: ClientsComponent
            },
            {
                path: 'prospects', component: ProspectsComponent
            },
            {
                path: 'transfer-historique', component: TransfersHistoriqueComponent
            },
            {
                path: 'send-money', component: HomePageComponent
            },
            {
                path: 'profile', component: ProfileComponent
            },
        ]
    }
];
