import { Route } from "@angular/router";
import { NavigationComponent } from "./navigation/navigation.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ClientsComponent } from "./clients/clients.component";
import { ProspectsComponent } from "./prospects/prospects.component";
import { TransfersHistoriqueComponent } from "./transfers-historique/transfers-historique.component";
import { ProfileComponent } from "./profile/profile.component";
import { ServeTransferComponent } from "./serve-transfer/serve-transfer.component";
import { IssueTransferComponent } from "./issue-transfer/issue-transfer.component";



export const APP_ROUTES: Route[] = [

    {
        path: '', component: NavigationComponent, children: [
            {
                path: '', component: HomePageComponent
            },
            {
                path: 'clients', component: ClientsComponent
            },
            {
                path:'prospects', component: ProspectsComponent
            },
            {
                path: 'transfers-history', component: TransfersHistoriqueComponent
            },
            {
                path: 'profile', component: ProfileComponent
            },
            {
                path : 'serve-transfer', component: ServeTransferComponent
            },
            {
                path: 'issue-transfer', component: IssueTransferComponent
            }
        ]
    }
]