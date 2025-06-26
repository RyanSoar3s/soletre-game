import { ResolveFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RequestApiService } from '@services/request-api.service';
import { LocalStorageService } from '@services/local-storage.service';
import { SoletreGameService } from '@services/soletre-game.service';
import { GetDateService } from '@services/get-date.service';
import { of, take, tap, map, catchError } from 'rxjs';

export const soletreGameDataResolver: ResolveFn<void> = () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return of(undefined);

  const localStorageService = inject(LocalStorageService);
  const soletreGameService = inject(SoletreGameService);
  const requestApiService = inject(RequestApiService);
  const getDataService = inject(GetDateService);

  const today = getDataService.getDate();
  const saved = localStorageService.hasItem("SoletreGame");
  const soletre = soletreGameService.getSoletreGame("SoletreGame");

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

      if (!saved) {
        const str = soletreGameService.formatSoletreGameValue(data.game!);
        localStorageService.saveItem("SoletreGame", str);

      }

    }),
    map(() => undefined),
    catchError((err) => {
      console.error(err);
      return of(undefined);

    })

  );

};
