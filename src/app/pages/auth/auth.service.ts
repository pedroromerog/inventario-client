import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../usuarios/interfaces/usuario.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
    api = environment.api;
    http = inject(HttpClient);
    localStorage = '--';

    constructor() {}

    setUser(user: Usuario) {
        localStorage.setItem(this.localStorage, atob(JSON.stringify(user)));
    }

    clearUser() {
        localStorage.removeItem(this.localStorage);
    }

    getRolId(): number | null {
        const user = this.getUser();
        return user ? user.rolId : null;
    }

    getUser(): Usuario | null {
        const user = localStorage.getItem(this.localStorage);
        if (user) {
            return JSON.parse(atob(user)) as Usuario;
        }
        return null;
    }

    login(data: { username: string; password: string }) {
        return this.http.post(`${this.api}/auth/login`, data, {
            withCredentials: true,
        });
    }

    me() {
        return this.http.get(`${this.api}/auth/verify-token`, {
            withCredentials: true,
        });
    }

    register(data: any) {
        return this.http.post(`${this.api}/auth/register`, data, {
            withCredentials: true,
        });
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
