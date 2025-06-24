import { CanActivateFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';

export const canActiveRouteGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    router.navigate(['/']);
    return false;

  }

  const localStorageService = inject(LocalStorageService);
  let isGameSaved = localStorageService.hasItem("SoletreGame");

  if (!isGameSaved) {
    router.navigate(['/']);
    return false;

  }

  return true;

};
