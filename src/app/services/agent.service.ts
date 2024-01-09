import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Agent } from '../interfaces/agent';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  
  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string = environment.redirectUri +'/agency-service/api/v1/agents';

  constructor() { }

  getAgentById$ = (id: string) => <Observable<Agent>>
  this.http.get<Agent>(`${this.apiUrl}/${id}`)
    .pipe(
      tap(console.log),
      catchError(() => {
        return of('error getting agent')
      })
    );
}
