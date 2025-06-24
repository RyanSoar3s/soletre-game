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

  requestSoletreGameApi(): Observable<{ message: string, game: SoletreGame | null, error?: unknown }> {
    return this.http.get(`${environment.apiUrl}/api/wordlist`) as Observable<{ message: string, game: SoletreGame | null, error?: unknown }>;

  }

  requestCheckWordApi(word: string): Observable<{ isValid: boolean, word: string | undefined }> {
    return this.http.post(`${environment.apiUrl}/api/wordlist/check-word`, { word }) as Observable<{ isValid: boolean, word: string | undefined }>;

  }

}
