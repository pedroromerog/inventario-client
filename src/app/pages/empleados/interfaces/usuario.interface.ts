import { EstadoUsuario } from '@/shared/enums/user.enums';
import { Rol } from './rol.interface';

export interface Usuario {
    id: string;
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    estado: EstadoUsuario;
    rolId: number;
    rol: Rol;
    telefono?: string;
    departamento?: string;
    cargo?: string;
    notas?: string;
    ultimoAcceso?: Date;
    requiereCambioPassword?: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
