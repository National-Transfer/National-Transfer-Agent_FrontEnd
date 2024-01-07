import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transfers-historique',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './transfers-historique.component.html',
  styleUrl: './transfers-historique.component.css'
})
export class TransfersHistoriqueComponent {

  faTrash = faTrash;

}
