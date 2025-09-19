import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {
    api = `${environment.api}/users`;
    constructor(private http: HttpClient) {}

    create(value: any) {
        return this.http.post(`${this.api}`, value, {
            withCredentials: true,
        });
    }

    getAll() {
        return this.http.get<Usuario[]>(`${this.api}`, {
            withCredentials: true,
        });
    }

    getById(id: string | null) {
        return this.http.get<Usuario>(`${this.api}/${id}`, {
            withCredentials: true,
        });
    }

    update(id: string, value: any) {
        return this.http.patch(`${this.api}/${id}`, value, {
            withCredentials: true,
        });
    }

    delete(id: string) {
        return this.http.delete(`${this.api}/${id}`, {
            withCredentials: true,
        });
    }
}
