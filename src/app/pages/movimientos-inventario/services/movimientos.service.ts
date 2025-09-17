import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movimiento } from '../interfaces/movimiento.interface';

@Injectable({
    providedIn: 'root',
})
export class MovimientosService {
    api = `${environment.api}/movimientos`;
    constructor(private http: HttpClient) {}

    create(value: any) {
        return this.http.post(`${this.api}`, value, {
            withCredentials: true,
        });
    }

    getAll() {
        return this.http.get<Movimiento[]>(`${this.api}`, {
            withCredentials: true,
        });
    }

    getById(proveedorId: number | null) {
        return this.http.get<Movimiento>(`${this.api}/${proveedorId}`, {
            withCredentials: true,
        });
    }

    update(id: number, value: any) {
        return this.http.patch(`${this.api}/${id}`, value, {
            withCredentials: true,
        });
    }

    delete(id: number) {
        return this.http.delete(`${this.api}</${id}`, {
            withCredentials: true,
        });
    }
}
