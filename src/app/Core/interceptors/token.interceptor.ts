import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ProfileService } from 'app/Shared/Service/profile.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const profileService = inject(ProfileService);
  const token = profileService.getToken();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
};
