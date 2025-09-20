import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    api = environment.api;
    http = inject(HttpClient);

    constructor() {}

    login(data: { username: string; password: string }) {
        return this.http.post(`${this.api}/auth/login`, data, {
            withCredentials: true,
        });
    }

    me() {
        return this.http.get(`${this.api}/auth/verify-token`, { withCredentials: true });
    }

    /**
     * Logout the current user, removing the authentication cookie.
     */
    logout() {
        return this.http.post(
            `${this.api}/auth/logout`,
            {},
            {
                withCredentials: true,
            },
        );
    }
}
