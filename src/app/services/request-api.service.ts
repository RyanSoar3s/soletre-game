import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '@models/response-api.model';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {
  private http = inject(HttpClient);

  requestSoletreGameApi(): Observable<ResponseApi> {
    return this.http.get(`${environment.apiUrl}/api/wordlist`) as Observable<ResponseApi>;

  }

}
