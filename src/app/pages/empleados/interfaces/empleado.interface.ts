import { EstadoEmpleado, TipoEmpleado } from '@/shared/enums/empleado.enums';

export interface Empleado {
    id: number;
    codigo: string;
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    tipo: TipoEmpleado;
    estado: EstadoEmpleado;
    cargo: string;
    fechaContratacion: Date;
    observaciones: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
