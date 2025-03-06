import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      _router.navigate(['/login']);
      return false;
    }
  } else {
    // Handle the case where the code is not running in the browser (e.g., server-side rendering)
    _router.navigate(['/login']);
    return false;
  }
};
