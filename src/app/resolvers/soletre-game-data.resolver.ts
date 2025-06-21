import { ResolveFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RequestApiService } from '@services/request-api.service';
import { GameService } from '@services/game.service';

export const soletreGameDataResolver: ResolveFn<void> = () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return;

  const gameService = inject(GameService);
  const isGameSaved = gameService.isGameSaved();

  const requestApiService = inject(RequestApiService);
  const date = new Date().getDate();

  if (isGameSaved && gameService.getGame()?.date === date) return;

  if (gameService.getGame()?.date !== date) gameService.clearGame();

  requestApiService.requestSoletreGameApi().subscribe((data) => {
    gameService.saveGame(data);

  });

};
