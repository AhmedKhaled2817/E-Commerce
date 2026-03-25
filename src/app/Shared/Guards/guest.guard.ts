import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../Service/profile.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (!profileService.isLoggedIn()) {
    return true;
  }

  // Redirect to home if already authenticated
  router.navigate(['/public/home']);
  return false;
};
