import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { Prospect } from '../interfaces/prospect';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProspectService {

  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string = 'http://client-service/api/prospects';

  constructor() { }


  getAllProspects$ = <Observable<Prospect[]>>
    this.http.get<Prospect[]>(`${this.apiUrl}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error getting prospects')
        })
      );

    saveProspect$ = (prospect: Prospect) => <Observable<Prospect>>
    this.http.post<Prospect>(`${this.apiUrl}`, prospect, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error saving prospect')
        })
      );

    updateProspect$ = (prospect: Prospect) => <Observable<Prospect>>
    this.http.put<Prospect>(`${this.apiUrl}/${prospect.id}`, prospect, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error updating prospect')
        })
      );

    deleteProspect$ = (prospectId: string) => <Observable<any>>
    this.http.delete<any>(`${this.apiUrl}/${prospectId}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error deleting prospect')
        })
      );

      convertToClient$ = (prospectId: string) => <Observable<any>>
      this.http.post<any>(`${this.apiUrl}/${prospectId}`, httpOptions)
        .pipe(
          tap(console.log),
          catchError(() => {
            return of('error coverting prospect')
          })
        );

}
