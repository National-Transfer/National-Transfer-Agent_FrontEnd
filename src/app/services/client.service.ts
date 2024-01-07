import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { Client } from '../interfaces/client';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string = 'http://client-service/api/clients';

  constructor() { }


  getAllClients$ = <Observable<Client[]>>
    this.http.get<Client[]>(`${this.apiUrl}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error getting clients')
        })
      );

  saveClient$ = (client: Client) => <Observable<Client>>
    this.http.post<Client>(`${this.apiUrl}`, client, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error saving client')
        })
      );

  updateClient$ = (client: Client) => <Observable<Client>>
    this.http.put<Client>(`${this.apiUrl}/${client.id}`, client, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error updating Client')
        })
      );

  deleteClient$ = (clientId: string) => <Observable<any>>
    this.http.delete<any>(`${this.apiUrl}/${clientId}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error deleting Client')
        })
      );

}