import { Route } from "@angular/router";
import { NavigationComponent } from "./navigation/navigation.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ClientsComponent } from "./clients/clients.component";
import { ProspectsComponent } from "./prospects/prospects.component";
import { TransfersHistoriqueComponent } from "./transfers-historique/transfers-historique.component";
import { ProfileComponent } from "./profile/profile.component";
import { ServeTransferWalletComponent } from "./serve-transfer-wallet/serve-transfer-wallet.component";
import { ServeTransferComponent } from "./serve-transfer-cash/serve-transfer-cash.component";
import { IssueTransferComponent } from "./issue-transfer-cash/issue-transfer.component";
import { IssueTransferWalletComponent } from "./issue-transfer-wallet/issue-transfer-wallet.component";




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
                path : 'serve-transfer-cash', component: ServeTransferComponent
            },
            {
                path : 'serve-transfer-wallet', component: ServeTransferWalletComponent
            },
            {
                path: 'issue-transfer-cash', component: IssueTransferComponent
            },
            {
                path: 'issue-transfer-wallet' , component: IssueTransferWalletComponent
            }
        ]
    }
]