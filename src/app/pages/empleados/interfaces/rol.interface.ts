export interface Rol {
    id: number;
    codigo: string;
    nombre: string;
    permisos: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
