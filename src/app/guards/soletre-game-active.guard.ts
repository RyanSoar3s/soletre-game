import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SoletreGame } from '@models/soletre-game.model';
import { LocalStorageService } from '@services/local-storage.service';
import getDate from '../../libs/get-current-date';

export const soletreGameActiveGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    router.navigate(['/']);
    return false;

  }

  const localStorageService = inject(LocalStorageService);
  const isGameSaved = localStorageService.hasItem("@soletre/game");
  const isTokenSaved = localStorageService.hasItem("soletre_game_token");
  const soletreGame = ((isGameSaved) ? JSON.parse(localStorageService.getItem("@soletre/game")!) : {}) as SoletreGame;

  const today = getDate();

  if (!isGameSaved || !isTokenSaved || soletreGame.date !== today) {
    router.navigate(['/']);
    return false;

  }

  return true;

};
