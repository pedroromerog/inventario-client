import {
    EstadoProducto,
    TipoProducto,
    UnidadMedida,
} from '@/shared/enums/producto.enums';

export interface Producto {
    id: number;
    codigo: string;
    nombre: string;
    descripcion?: string;
    tipo: TipoProducto;
    estado: EstadoProducto;
    unidadMedida: UnidadMedida;
    categoriaId?: number;
    proveedorId?: number;
    precioCompra?: number;
    precioVenta?: number;
    precioPromedio?: number;
    stockMinimo: number;
    stockMaximo: number;
    marca?: string;
    modelo?: string;
    color?: string;
    dimensiones?: string;
    peso?: number;
    especificaciones?: string;
    instrucciones?: string;
    notas?: string;
    requiereRefrigeracion?: boolean;
    esFragil?: boolean;
    esPeligroso?: boolean;
    diasVidaUtil?: number;
    imagenUrl?: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
