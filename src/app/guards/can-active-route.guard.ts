import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { GameService } from '@services/game.service';
import { Router } from '@angular/router';

export const canActiveRouteGuard: CanActivateFn = () => {
  const router = inject(Router);
  const gameService = inject(GameService);
  const isGameSaved = gameService.isGameSaved();

  if (!isGameSaved) {
    router.navigate(['/']);
    return false;

  }

  return true;

};
