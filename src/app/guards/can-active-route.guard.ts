import { CanActivateFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';
import { SoletreGame } from '@models/soletre-game.model';

export const canActiveRouteGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    router.navigate(['/']);
    return false;

  }

  const localStorageService = inject(LocalStorageService);
  const isGameSaved = localStorageService.hasItem("SoletreGame");
  const soletreGame = JSON.parse(localStorageService.getItem("SoletreGame")!) as SoletreGame;

  if (!isGameSaved || soletreGame!.date !== new Date().getDate()) {
    router.navigate(['/']);
    return false;

  }

  return true;

};
