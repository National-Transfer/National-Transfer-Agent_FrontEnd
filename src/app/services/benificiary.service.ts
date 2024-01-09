import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Benificiary } from '../interfaces/Benificiary';
import { Observable, catchError, of, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class BenificiaryService {

  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string = environment.redirectUri +'/kyc-service/api/v1/beneficiaries';
  
  getBeneficiary$ = (id : string) => <Observable<Benificiary>>
  this.http.get<Benificiary>(`${this.apiUrl}/${id}`)
    .pipe(
      tap(console.log),
      catchError(() => {
        return of('error getting benifiary')
      })
    );

  getAllBeneficiariesForClient$ = (id : string) => <Observable<Benificiary[]>>
      this.http.get<Benificiary[]>(`${this.apiUrl}/client/${id}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error getting benifiaries')
        })
      );

  
  saveBeneficiaryForClient$ = (id : string, benificiary : Benificiary ) => <Observable<Benificiary>>
        this.http.post<Benificiary>(`${this.apiUrl}/client/${id}`, benificiary, httpOptions )
        .pipe(
          tap(console.log),
          catchError(() => {
            return of('error saving benificiary')
          })
        );
  
}
