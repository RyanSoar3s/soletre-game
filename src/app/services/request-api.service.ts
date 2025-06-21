import { inject, Injectable } from '@angular/core';
import { SoletreGame } from '@models/soletre-game.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestApiService {
  private http = inject(HttpClient);

  requestSoletreGameApi(): Observable<SoletreGame> {
    return this.http.get(`${environment.apiUrl}/api/wordlist`) as Observable<SoletreGame>;

  }

  requestCheckWordApi(word: string): Observable<{ valid: boolean, word: string | undefined }> {
    return this.http.post(`${environment.apiUrl}/api/wordlist/check-word`, { word }) as Observable<{ valid: boolean, word: string | undefined }>;

  }

}
