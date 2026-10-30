
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Jangan kirim token pada proses login
  if (req.url.includes('/Auth/login') || !token) {
    return next(req);
  }

  // Tambahkan JWT ke header setiap request API
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
