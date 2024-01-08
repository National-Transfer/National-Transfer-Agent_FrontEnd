import { Component, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faRotateLeft, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClientService } from '../../services/client.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Client } from '../../interfaces/client';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{

 
  private clientService = inject(ClientService);
  public dataSubject = new BehaviorSubject<Client[]>([]);


  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faSquarePlus = faSquarePlus;
  faRotateLeft = faRotateLeft;

  clientsResponse !: Client[];


  clientToEdit !: Client;
  clientToDelete !: Client
  
  ngOnInit(): void {
    this.clientService.getAllClients$.subscribe((response : Client[]) => {
      this.dataSubject.next(response);

      this.clientsResponse = response
      this.clientsResponse = response.reverse();
    })
  }

  addClient(addForm: NgForm) {
    let client : Client = addForm.value;
    client.title = client.title + " "+ client.firstName.split(' ')[0];

    console.log(client);
    
    this.clientService.saveClient$(client).subscribe( (response : Client)=> {
      this.dataSubject.next([response, ...this.dataSubject.value]);
      this.clientsResponse = this.dataSubject.value;
    });
    addForm.reset();
  }

  deleteClient(client: Client): void {
    console.log(client)
    this.clientService.deleteClient$(client.id as string).subscribe(() => {

      const updatedClients = this.dataSubject.value.filter(cl => cl.id !== client.id);

      this.dataSubject.next(updatedClients);
      this.clientsResponse = updatedClients;
    })
  }

  updateClient(client: Client) {
    this.clientService.updateClient$(client).subscribe(
      (response : Client) => {
        if (response) {
          const updatedClient = response;
          const updatedClients = this.dataSubject.value.map((a: Client) =>
            a.id === updatedClient?.id ? { ...a, ...updatedClient } : a
          );
  
          this.dataSubject.next(updatedClients);
          this.clientsResponse = updatedClients;
        } else {
          console.error('Invalid response or missing client data.');
        }
      },
      error => {
        alert('An error has occured while trying to update client ' + error)
      }
    );
  }

  doSearch(value: string) {
    console.log(`value=${value}`);

    this.clientService.filterClients$(value, this.dataSubject.value).subscribe((response : Client[]) =>{
      this.clientsResponse = response;
    })
  }


  onOpenModal(client: any, mode: string) {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#AddModal');
      console.log("add")
    }
    if (mode === 'view') {
      this.clientToEdit = client;
      button.setAttribute('data-bs-target', '#viewModal');
    }
    if (mode === 'edit') {
      this.clientToEdit = client;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.clientToDelete = client;
      button.setAttribute('data-bs-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

  
}
