import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProspectsComponent } from './components/prospects/prospects.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TransfersHistoriqueComponent } from './components/transfers-historique/transfers-historique.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'National-Transfer-Agent_FrontEnd';
}
