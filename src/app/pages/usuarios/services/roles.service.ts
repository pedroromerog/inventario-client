import { Injectable } from '@angular/core';
import { Rol } from '../interfaces/rol.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RolesService {
    api = `${environment.api}/roles`;
    constructor(private http: HttpClient) {}

    create(value: any) {
        return this.http.post(`${this.api}`, value, {
            withCredentials: true,
        });
    }

    getAll() {
        return this.http.get<[Rol[], number]>(`${this.api}`, {
            withCredentials: true,
        });
    }

    getById(id: string | null) {
        return this.http.get<Rol>(`${this.api}/${id}`, {
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
