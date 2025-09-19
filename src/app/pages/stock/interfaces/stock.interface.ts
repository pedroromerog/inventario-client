import { Bodega } from '@/pages/bodegas/interfaces/bodega.interface';
import { Producto } from '@/pages/productos/interfaces/producto.interface';
import { EstadoStock } from '@/shared/enums/stock.enums';

export interface Stock {
    id: number;
    productoId: number;
    bodegaId: number;
    stockActual: number;
    stockReservado: number;
    stockDisponible: number;
    stockMinimo: number;
    stockMaximo: number;
    estado: EstadoStock;
    precioPromedio?: number;
    precioUltimo?: number;
    fechaUltimoMovimiento?: Date;
    fechaUltimaActualizacion?: Date;
    observaciones?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    producto: Producto;
    bodega: Bodega;
}
