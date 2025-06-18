import { inject, Injectable } from '@angular/core';
import { SoletreGame } from '@models/soletre-game.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {
  private soletreGame!: SoletreGame;
  private http = inject(HttpClient);

  requestApi(): void {
    this.http.get(`${environment.apiUrl}/api/wordlist`).subscribe((data) => this.soletreGame = data as SoletreGame);

  }

  getSoletreGame(): SoletreGame {
    return this.soletreGame;

  }

}
