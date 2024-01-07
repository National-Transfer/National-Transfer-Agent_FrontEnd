import { Component, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faRotateLeft, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClientService } from '../../services/client.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Client } from '../../interfaces/client';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{

 
  private clientService = inject(ClientService);

  deleteClient!: Client;
  clients: Client[] = [];


  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faSquarePlus = faSquarePlus;
  faRotateLeft = faRotateLeft;

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients() {
    this.clientService.getAllClients$.subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => console.error('Error fetching clients:', error)
    );
  }


  add(addForm: NgForm) {
    const newClient: Client = addForm.value;
    this.clientService.saveClient$(newClient).subscribe(
      (client) => {
        this.clients.push(client);
        addForm.resetForm();
      },
      (error) => console.error('Error adding client:', error)
    );
  }
  
  update(updateForm : NgForm) {
    const updatedClient: Client = updateForm.value;
    this.clientService.updateClient$(updatedClient).subscribe(
      (client) => {
        const index = this.clients.findIndex(c => c.id === client.id);
        if (index !== -1) {
          this.clients[index] = client;
        }
      },
      (error) => console.error('Error updating client:', error)
    );
  }
  delete(client : Client) {
    this.clientService.deleteClient$(client.id!).subscribe(
      () => {
        this.clients = this.clients.filter(c => c.id !== client.id);
      },
      (error) => console.error('Error deleting client:', error)
    );
  }


  onOpenModal(client: any) {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    this.deleteClient = client;
    button.setAttribute('data-bs-target', '#deleteModal');
    container?.appendChild(button);
    button.click();
  }
  
}
