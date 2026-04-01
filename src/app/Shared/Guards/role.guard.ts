import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../Service/profile.service';
import { UserRole } from '../Models/user-profile';

export const roleGuard: CanActivateFn = (route) => {
  const profileService = inject(ProfileService);
  const router = inject(Router);
  const requiredRole = route.data?.['role'] as UserRole | undefined;

  if (!profileService.isLoggedIn()) {
    router.navigate(['/public/auth/login']);
    return false;
  }

  if (!requiredRole || profileService.hasRole(requiredRole)) {
    return true;
  }

  // User is authenticated but does not have required role.
  // Force logout so guest guard allows opening login page for account switch.
  profileService.logout();
  router.navigate(['/public/auth/login']);
  return false;
};
