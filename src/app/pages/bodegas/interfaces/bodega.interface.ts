import { TipoBodega, EstadoBodega } from '@/shared/enums/bodega.enums';

export interface Bodega {
    id: number;
    codigo: string;
    nombre: string;
    descripcion?: string;
    tipo: TipoBodega;
    estado: EstadoBodega;
    direccion: string;
    ciudad: string;
    codigoPostal: string;
    telefono: string;
    email: string;
    notasEspeciales: string;
    responsableId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
