import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../interfaces/proveedor.interface';

@Injectable({
    providedIn: 'root',
})
export class ProveedoresService {
    api = environment.api;
    constructor(private http: HttpClient) {}

    create(value: any) {
        return this.http.post(`${this.api}/proveedores`, value, {
            withCredentials: true,
        });
    }

    getAll() {
        return this.http.get<Proveedor[]>(`${this.api}/proveedores`, {
            withCredentials: true,
        });
    }

    getById(proveedorId: number | null) {
        return this.http.get<Proveedor>(
            `${this.api}/proveedores/${proveedorId}`,
            {
                withCredentials: true,
            },
        );
    }

    update(id: number, value: any) {
        return this.http.patch(`${this.api}/proveedores/${id}`, value, {
            withCredentials: true,
        });
    }

    delete(id: number) {
        return this.http.delete(`${this.api}/proveedores/${id}`, {
            withCredentials: true,
        });
    }
}
