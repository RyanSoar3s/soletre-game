import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RequestApiService } from '@services/request-api.service';
import { Router } from '@angular/router';

export const canActiveRouteGuard: CanActivateFn = () => {
  const router = inject(Router);
  const requestApiService = inject(RequestApiService);
  const data = requestApiService.getSoletreGame();

  if (!data) {
    router.navigate(['/']);
    return false;

  }

  return true;
  
};
