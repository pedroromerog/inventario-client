import {
    EstadoMovimiento,
    MotivoMovimiento,
    TipoMovimiento,
} from '@/shared/enums/movimiento.enums';

export interface Movimiento {
    id: number;
    codigo: string;
    tipo: TipoMovimiento;
    estado: EstadoMovimiento;
    motivo: MotivoMovimiento;
    bodegaOrigenId?: number;
    bodegaDestinoId?: number;
    productoId: number;
    cantidad: number;
    precioUnitario?: number;
    precioTotal?: number;
    fechaMovimiento: Date;
    referencia?: string;
    numeroDocumento?: string;
    tipoDocumento?: string;
    observaciones?: string;
    solicitante?: string;
    autorizadorId?: string;
    evidenciaUrl?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
