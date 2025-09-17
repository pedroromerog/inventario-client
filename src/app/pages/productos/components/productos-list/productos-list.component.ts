import { ToastService } from '@/shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Producto } from '../../interfaces/producto.interface';
import { ProductosService } from '../../services/productos.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { EstadoProducto, TipoProducto } from '@/shared/enums/producto.enums';

@Component({
    selector: 'app-productos-list',
    template: `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    Lista de Productos 📦
                </h2>
                <app-button
                    label="Nuevo Producto"
                    icon="pi pi-plus"
                    class="p-button-primary"
                    routerLink="add"
                ></app-button>
            </div>

            <div class="hidden md:block">
                <p-table
                    [value]="productos"
                    [paginator]="true"
                    [rows]="10"
                    [showCurrentPageReport]="true"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                    [tableStyle]="{ 'min-width': '50rem' }"
                >
                    <ng-template pTemplate="header">
                        <tr>
                            <th class="text-left font-semibold text-gray-600">
                                Código
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Nombre
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Tipo
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Unidad
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Stock Mín.
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Estado
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Acciones
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-producto>
                        <tr>
                            <td>{{ producto.codigo }}</td>
                            <td>{{ producto.nombre }}</td>
                            <td>
                                <p-tag
                                    [value]="producto.tipo | titlecase"
                                    [severity]="getSeverityTipo(producto.tipo)"
                                ></p-tag>
                            </td>
                            <td>{{ producto.unidadMedida | titlecase }}</td>
                            <td>{{ producto.stockMinimo }}</td>
                            <td class="text-center">
                                <p-tag
                                    [value]="producto.estado | titlecase"
                                    [severity]="
                                        getSeverityEstado(producto.estado)
                                    "
                                ></p-tag>
                            </td>
                            <td class="flex justify-center space-x-2">
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="info"
                                    icon="pi pi-eye"
                                    pTooltip="Ver detalles"
                                    [routerLink]="'view/' + producto.id"
                                ></app-button>
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="warn"
                                    icon="pi pi-pencil"
                                    pTooltip="Editar"
                                    [routerLink]="'edit/' + producto.id"
                                ></app-button>
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="danger"
                                    icon="pi pi-trash"
                                    pTooltip="Eliminar"
                                    (clicked)="onDelete(producto.id)"
                                ></app-button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>

            <div class="md:hidden">
                <div
                    *ngFor="let producto of productos"
                    class="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
                >
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg font-bold text-gray-800">
                            {{ producto.nombre }}
                        </h3>
                        <p-tag
                            [value]="producto.estado | titlecase"
                            [severity]="getSeverityEstado(producto.estado)"
                        ></p-tag>
                    </div>
                    <div class="text-sm text-gray-600 space-y-1">
                        <p><strong>Código:</strong> {{ producto.codigo }}</p>
                        <p>
                            <strong>Tipo:</strong>
                            <p-tag
                                [value]="producto.tipo | titlecase"
                                [severity]="getSeverityTipo(producto.tipo)"
                            ></p-tag>
                        </p>
                        <p>
                            <strong>Unidad:</strong>
                            {{ producto.unidadMedida | titlecase }}
                        </p>
                    </div>
                    <div class="flex justify-end mt-4 space-x-2">
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="info"
                            icon="pi pi-eye"
                            [routerLink]="'view/' + producto.id"
                        ></app-button>
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="warn"
                            icon="pi pi-pencil"
                            [routerLink]="'edit/' + producto.id"
                        ></app-button>
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="danger"
                            icon="pi pi-trash"
                            (clicked)="onDelete(producto.id)"
                        ></app-button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [],
    imports: [
        CommonModule,
        ButtonComponent,
        TableModule,
        RouterModule,
        TagModule,
    ],
    providers: [ToastService],
})
export class ProductosListComponent implements OnInit {
    productos: Producto[] = [];

    constructor(
        private productosService: ProductosService,
        private confirmationService: ConfirmationService,
        private toastService: ToastService, // O tu servicio de toasts
    ) {}

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.productosService.getAll().subscribe({
            next: (data: Producto[]) => {
                this.productos = data;
            },
            error: (err) => {
                console.error(err);
                this.toastService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar los productos.',
                });
            },
        });
    }

    onDelete(id: number) {
        this.confirmationService.confirm({
            message: '¿Está seguro de eliminar este producto?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productosService.delete(id).subscribe({
                    next: () => {
                        this.toastService.add({
                            severity: 'success',
                            summary: 'Eliminado',
                            detail: 'Producto eliminado correctamente.',
                        });
                        this.getData();
                    },
                    error: (err) => {
                        console.error(err);
                        this.toastService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail:
                                err.error?.message ||
                                'No se pudo eliminar el producto.',
                        });
                    },
                });
            },
        });
    }

    getSeverityEstado(estado: EstadoProducto): string {
        switch (estado) {
            case EstadoProducto.ACTIVO:
                return 'success';
            case EstadoProducto.INACTIVO:
            case EstadoProducto.AGOTADO:
                return 'danger';
            case EstadoProducto.DISCONTINUADO:
                return 'warning';
            default:
                return 'secondary';
        }
    }

    getSeverityTipo(tipo: TipoProducto): string {
        return 'info';

        // switch (tipo) {
        //     case TipoProducto.PRODUCTO_TERMINADO:
        //     case TipoProducto.EQUIPO:
        //         return 'info';
        //     case TipoProducto.MATERIA_PRIMA:
        //     case TipoProducto.INSUMO:
        //         return 'warning';
        //     case TipoProducto.SERVICIO:
        //         return 'secondary';
        //     default:
        //         return 'secondary';
        // }
    }
}
