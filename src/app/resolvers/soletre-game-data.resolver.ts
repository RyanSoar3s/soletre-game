import { ResolveFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RequestApiService } from '@services/request-api.service';
import { LocalStorageService } from '@services/local-storage.service';
import { SoletreGameService } from '@services/soletre-game.service';
import { of, take, tap, map, catchError } from 'rxjs';
import getDate from '../../libs/get-current-date';

export const soletreGameDataResolver: ResolveFn<void> = () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return of(undefined);

  const localStorageService = inject(LocalStorageService);
  const soletreGameService = inject(SoletreGameService);
  const requestApiService = inject(RequestApiService);

  const today = getDate();
  const isGameSaved = localStorageService.hasItem("@soletre/game");
  const isTokenSaved = localStorageService.hasItem("soletre_game_token");
  const soletre = soletreGameService.getSoletreGame("@soletre/game");

  if (soletre?.date !== today) {
    localStorageService.clearAll();

  }

  return requestApiService.requestSoletreGameApi().pipe(
    take(1),
    tap((data) => {
      if (!data.game) {
        console.error(data.message);
        throw data.error;

      }
      console.log(data.message);

      if (!isGameSaved || !isTokenSaved) {
        const str = soletreGameService.formatSoletreGameValue(data.game!);
        localStorageService.saveItem("@soletre/game", str);
        localStorageService.saveItem("soletre_game_token", data.token);

      }

    }),
    map(() => undefined),
    catchError((err) => {
      console.error(err);
      return of(undefined);

    })

  );

};
