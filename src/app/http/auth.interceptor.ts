import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokenStorage } from '../core/auth-token.storage';

/** Mirrors Exsample axios: `Authorization: Bearer <accessToken>`. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthTokenStorage).getAccessToken();
  if (!token) {
    return next(req);
  }
  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
