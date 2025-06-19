import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { RequestApiService } from '@services/request-api.service';

export const soletreGameDataResolver: ResolveFn<void> = () => {
  const requestApiService = inject(RequestApiService);
  const data = requestApiService.getSoletreGame();

  if (!data) {
    requestApiService.requestApi();

  }

};
