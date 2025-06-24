import { ResolveFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RequestApiService } from '@services/request-api.service';
import { LocalStorageService } from '@services/local-storage.service';
import { SoletreGameService } from '@services/soletre-game.service';
import { of, take, tap, map, catchError } from 'rxjs';

export const soletreGameDataResolver: ResolveFn<void> = () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return of(undefined);

  const localStorageService = inject(LocalStorageService);
  const soletreGameService = inject(SoletreGameService);
  const requestApiService = inject(RequestApiService);

  const today = new Date().getDate();
  const saved = localStorageService.getItem("SoletreGame");
  const soletre = soletreGameService.getSoletreGame("SoletreGame");

  if (saved && soletre?.date === today) {
    console.log("Game already started.")
    return of(undefined);

  }

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
      const str = soletreGameService.formatSoletreGameValue(data.game!);
      localStorageService.saveItem("SoletreGame", str);

    }),
    map(() => undefined),
    catchError((err) => {
      console.error(err);
      return of(undefined);

    })

  );

};
