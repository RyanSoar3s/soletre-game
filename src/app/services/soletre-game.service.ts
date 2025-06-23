import { inject, Injectable } from '@angular/core';
import { SoletreGame } from '@models/soletre-game.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SoletreGameService {
  private localStorageService = inject(LocalStorageService);

  formatSoletreGameValue(soletreGame: SoletreGame): string {
    let availableLetters = soletreGame.availableLetters;
    let fullAvailableLetters = soletreGame.fullAvailableLetters;

    if (typeof soletreGame.availableLetters === "string") {
      availableLetters = (availableLetters as string).split("");
      fullAvailableLetters = (fullAvailableLetters as string).split("");

    }
    soletreGame.availableLetters = availableLetters;
    soletreGame.fullAvailableLetters = fullAvailableLetters;

    return JSON.stringify(soletreGame);

  }

  getSoletreGame(key: string): SoletreGame {
    const value = this.localStorageService.getItem(key);
    return JSON.parse(value!) as SoletreGame;

  }

}
