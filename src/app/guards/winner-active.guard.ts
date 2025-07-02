import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { SoletreGameService } from '@services/soletre-game.service';

export const winnerActiveGuard: CanActivateChildFn = () => {
  const soletreGameService = inject(SoletreGameService);
  const route = inject(Router);

  const soletreGame = soletreGameService.getSoletreGame("@soletre/game");
  const totalPoints = soletreGame.totalPoints;
  const points = soletreGame.points;

  if (totalPoints !== points) {
    route.navigate([ "/soletre" ]);
    return false;

  }

  return true;
};
