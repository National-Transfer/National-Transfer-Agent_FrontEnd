import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faLockOpen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Transfer } from '../../interfaces/transfer';

@Component({
  selector: 'app-transfers-historique',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './transfers-historique.component.html',
  styleUrl: './transfers-historique.component.css'
})
export class TransfersHistoriqueComponent {

  selectedTransfer !: Transfer;

  faTrash = faTrash;
  faBan = faBan
  faLockOpen = faLockOpen

  unblock(transfer: Transfer) {}
  extourne(transfer: Transfer) {}

  onOpenModal(transfer: Transfer, mode: string){

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(mode === 'extourne'){
      this.selectedTransfer = transfer;
      button.setAttribute('data-bs-target', '#extourneModal');
    }
    if(mode === 'unblock'){
      this.selectedTransfer = transfer;
      button.setAttribute('data-bs-target', '#unbockModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
