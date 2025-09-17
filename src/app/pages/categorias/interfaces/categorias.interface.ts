import { EstadoCategoria, TipoCategoria } from '@/shared/enums/categoria.enums';

export interface Categoria {
    id: number;
    codigo: string;
    nombre: string;
    descripcion?: string;
    tipo: TipoCategoria;
    estado: EstadoCategoria;
    color?: string;
    orden: number;
    notas?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
