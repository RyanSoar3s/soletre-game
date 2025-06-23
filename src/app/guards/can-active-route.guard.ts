import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';

export const canActiveRouteGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  let isGameSaved = localStorageService.hasItem("SoletreGame");

  if (!isGameSaved) {
    router.navigate(['/']);
    return false;

  }

  return true;

};
