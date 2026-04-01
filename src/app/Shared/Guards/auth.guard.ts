import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../Service/profile.service';

export const authGuard: CanActivateFn = (route, state) => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (profileService.isLoggedIn() && profileService.isUserActive()) {
    return true;
  }

  // Redirect to login if not authenticated
  router.navigate(['/public/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
