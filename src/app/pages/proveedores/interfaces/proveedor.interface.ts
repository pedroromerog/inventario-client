import { EstadoProveedor, TipoProveedor } from '@/shared/enums/proveedor.enums';

export interface Proveedor {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    tipo: TipoProveedor;
    estado: EstadoProveedor;
    nit: string;
    razonSocial: string;
    direccion: string;
    ciudad: string;
    departamento: string;
    telefono: string;
    email: string;
    sitioWeb: string;
    contactoPrincipal: string;
    telefonoContacto: string;
    emailContacto: string;
    notas: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
