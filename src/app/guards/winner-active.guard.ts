import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { SoletreGameService } from '@services/soletre-game.service';

export const winnerActiveGuard: CanActivateChildFn = () => {
  const soletreGameService = inject(SoletreGameService);
  const route = inject(Router);

  const soletreGame = soletreGameService.getSoletreGame("@soletre/game");
  const total = soletreGame.total;
  const length = soletreGame.words.length;

  if (total !== length) {
    route.navigate([ "/soletre" ]);
    return false;

  }

  return true;
};
