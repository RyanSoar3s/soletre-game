import { Injectable } from '@angular/core';
import { SoletreGame } from '@models/soletre-game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  saveGame(soletreGame: SoletreGame, isFormatted: boolean=true): void {
    const formattedGame = (isFormatted) ? this.formatGame(soletreGame) : soletreGame;
    const soletreGameString = JSON.stringify(formattedGame);
    localStorage.setItem('soletreGame', soletreGameString);

  }

  getGame(): SoletreGame | null {
    const soletreGameString = localStorage.getItem('soletreGame');
    if (soletreGameString) {
      return JSON.parse(soletreGameString) as SoletreGame;

    }
    return null;

  }

  updateGame(soletreGame: SoletreGame): void {
    const existingGame = this.isGameSaved();
    if (!existingGame) return;

    this.clearGame();
    this.saveGame(soletreGame, false);

  }

  clearGame(): void {
    localStorage.removeItem('soletreGame');

  }

  isGameSaved(): boolean {
    return !!this.getGame();

  }

  private formatGame(soletreGame: SoletreGame): SoletreGame {
    let availableLetters = soletreGame.availableLetters;
    let fullAvailableLetters = soletreGame.fullAvailableLetters;

    if (typeof soletreGame.availableLetters === "string") {
      availableLetters = (availableLetters as string).split("");
      fullAvailableLetters = (fullAvailableLetters as string).split("");

    }
    soletreGame.availableLetters = availableLetters;
    soletreGame.fullAvailableLetters = fullAvailableLetters;

    return soletreGame;

  }

}
