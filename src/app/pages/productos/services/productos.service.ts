import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductosService {
    api = `${environment.api}/productos`;
    constructor(private http: HttpClient) {}

    create(value: any) {
        return this.http.post(`${this.api}`, value, {
            withCredentials: true,
        });
    }

    getAll() {
        return this.http.get<Producto[]>(`${this.api}`, {
            withCredentials: true,
        });
    }

    getById(proveedorId: number | null) {
        return this.http.get<Producto>(`${this.api}/${proveedorId}`, {
            withCredentials: true,
        });
    }

    update(id: number, value: any) {
        return this.http.patch(`${this.api}/${id}`, value, {
            withCredentials: true,
        });
    }

    delete(id: number) {
        return this.http.delete(`${this.api}/${id}`, {
            withCredentials: true,
        });
    }
}
