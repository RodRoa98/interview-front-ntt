import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenKey = 'token';

    constructor(private cookieService: CookieService) {}

    getToken(): string | null {
        return this.cookieService.get('token') || null;
    }

    setToken(token: string): void {
        this.cookieService.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
    }

    clearToken(): void {
        this.cookieService.delete('token');
    }
}
