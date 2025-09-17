import {
    EstadoMovimiento,
    TipoMovimiento,
} from '@/shared/enums/movimiento.enums';
import { ToastService } from '@/shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Movimiento } from '../../interfaces/movimiento.interface';
import { MovimientosService } from '../../services/movimientos.service';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@/shared/components/ui/button/button.component';

@Component({
    selector: 'app-movimientos-list',
    imports: [
        TableModule,
        ButtonModule,
        TagModule,
        TooltipModule,
        CommonModule,
        RouterModule,
        ButtonComponent,
    ],
    template: `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    Historial de Movimientos
                </h2>
                <app-button
                    type="button"
                    label="Nuevo Movimiento"
                    icon="pi pi-plus"
                    class="p-button-primary"
                    routerLink="add"
                ></app-button>
            </div>

            <div class="hidden md:block">
                <p-table [value]="movimientos" [paginator]="true" [rows]="10">
                    <ng-template pTemplate="header">
                        <tr>
                            <th class="text-left font-semibold text-gray-600">
                                Código
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Tipo
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Estado
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Motivo
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Cantidad
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Fecha
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Acciones
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-movimiento>
                        <tr>
                            <td>{{ movimiento.codigo }}</td>
                            <td>
                                <p-tag
                                    [value]="movimiento.tipo"
                                    [severity]="
                                        getSeverityTipo(movimiento.tipo)
                                    "
                                ></p-tag>
                            </td>
                            <td>
                                <p-tag
                                    [value]="movimiento.estado"
                                    [severity]="
                                        getSeverityEstado(movimiento.estado)
                                    "
                                ></p-tag>
                            </td>
                            <td>{{ movimiento.motivo | titlecase }}</td>
                            <td>{{ movimiento.cantidad }}</td>
                            <td>
                                {{
                                    movimiento.fechaMovimiento
                                        | date: 'mediumDate'
                                }}
                            </td>
                            <td class="flex justify-center space-x-2">
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="info"
                                    icon="pi pi-eye"
                                    pTooltip="Ver Detalles"
                                ></app-button>
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="warn"
                                    icon="pi pi-pencil"
                                    pTooltip="Editar"
                                ></app-button>
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="danger"
                                    pButton
                                    icon="pi pi-trash"
                                    pTooltip="Eliminar"
                                ></app-button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>

            <div class="md:hidden">
                <div
                    *ngFor="let movimiento of movimientos"
                    class="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
                >
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg font-bold text-gray-800">
                            {{ movimiento.codigo }}
                        </h3>
                        <p-tag
                            [value]="movimiento.estado"
                            [severity]="getSeverityEstado(movimiento.estado)"
                        ></p-tag>
                    </div>
                    <div class="text-sm text-gray-600 space-y-1">
                        <p>
                            <strong>Tipo:</strong>
                            <p-tag
                                [value]="movimiento.tipo"
                                [severity]="getSeverityTipo(movimiento.tipo)"
                            ></p-tag>
                        </p>
                        <p>
                            <strong>Motivo:</strong>
                            {{ movimiento.motivo | titlecase }}
                        </p>
                        <p>
                            <strong>Cantidad:</strong> {{ movimiento.cantidad }}
                        </p>
                        <p>
                            <strong>Fecha:</strong>
                            {{ movimiento.fechaMovimiento | date: 'short' }}
                        </p>
                    </div>
                    <div class="flex justify-end mt-4 space-x-2">
                        <app-button
                            icon="pi pi-eye"
                            class="p-button-sm p-button-rounded p-button-text p-button-info"
                        ></app-button>
                        <app-button
                            icon="pi pi-pencil"
                            class="p-button-sm p-button-rounded p-button-text p-button-warning"
                        ></app-button>
                        <app-button
                            icon="pi pi-trash"
                            class="p-button-sm p-button-rounded p-button-text p-button-danger"
                        ></app-button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [],
    providers: [ToastService],
})
export class MovimientosListComponent implements OnInit {
    movimientos: Movimiento[] = [];
    constructor(
        private movimientosService: MovimientosService,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit() {
        this.getData();
    }

    onDelete(id: number) {
        this.confirmationService.confirm({
            message: '¿Está seguro de eliminar este proveedor?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.movimientosService.delete(id).subscribe({
                    next: () => {
                        this.toastService.deleteSuccess();
                        this.getData();
                    },
                    error: (err) => {
                        console.error(err);
                        this.toastService.deleteError(
                            err.error?.message || undefined,
                        );
                    },
                });
            },
        });
    }

    getData() {
        this.movimientosService.getAll().subscribe({
            next: (data) => {
                this.movimientos = data;
            },
            error: (err) => {
                console.error(err);
                this.toastService.listError(err.error?.message || undefined);
            },
        });
    }

    getSeverityTipo(tipo: TipoMovimiento): string {
        switch (tipo) {
            case TipoMovimiento.ENTRADA:
            case TipoMovimiento.COMPRA:
            case TipoMovimiento.PRODUCCION:
                return 'success';
            case TipoMovimiento.SALIDA:
            case TipoMovimiento.VENTA:
            case TipoMovimiento.MERMA:
            case TipoMovimiento.DEVOLUCION:
                return 'danger';
            case TipoMovimiento.TRANSFERENCIA:
            case TipoMovimiento.AJUSTE:
                return 'info';
            default:
                return 'secondary';
        }
    }

    getSeverityEstado(estado: EstadoMovimiento): string {
        switch (estado) {
            case EstadoMovimiento.COMPLETADO:
                return 'success';
            case EstadoMovimiento.PENDIENTE:
            case EstadoMovimiento.EN_REVISION:
                return 'warning';
            case EstadoMovimiento.EN_PROCESO:
                return 'info';
            case EstadoMovimiento.CANCELADO:
            case EstadoMovimiento.RECHAZADO:
                return 'danger';
            default:
                return 'secondary';
        }
    }
}
