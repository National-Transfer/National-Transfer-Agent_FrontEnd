import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Benificiary } from '../interfaces/Benificiary';
import { Observable, catchError, of, tap } from 'rxjs';

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
}
