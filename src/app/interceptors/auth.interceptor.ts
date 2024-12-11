import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const excludedUrls = ['/login', '/register'];

    if (excludedUrls.some(url => req.url.includes(url))) {
        return next(req);
    }

    const token = authService.getToken();

    if (token && typeof token === 'string' && token.trim() !== '') {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next(cloned);
    }

    return next(req);
}
