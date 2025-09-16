import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Proveedor } from '../../interfaces/proveedor.interface';
import { ProveedoresService } from '../../services/proveedores.service';
import { ToastService } from '@/shared/services/toast.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-proveedores-list',
    template: `
        <div class="">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">
                        Lista de Proveedores
                    </h2>
                    <app-button
                        label="Nuevo Proveedor"
                        icon="pi pi-plus"
                        class="p-button-primary"
                        routerLink="add"
                    ></app-button>
                </div>

                <div class="hidden md:block">
                    <p-table
                        [value]="proveedores"
                        [paginator]="true"
                        [rows]="10"
                        [showCurrentPageReport]="true"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                    >
                        <ng-template pTemplate="header">
                            <tr>
                                <th
                                    class="text-left font-semibold text-gray-600"
                                >
                                    Código
                                </th>
                                <th
                                    class="text-left font-semibold text-gray-600"
                                >
                                    Nombre
                                </th>
                                <th
                                    class="text-left font-semibold text-gray-600"
                                >
                                    NIT
                                </th>
                                <th
                                    class="text-left font-semibold text-gray-600"
                                >
                                    Tipo
                                </th>
                                <th
                                    class="text-center font-semibold text-gray-600"
                                >
                                    Estado
                                </th>
                                <th
                                    class="text-center font-semibold text-gray-600"
                                >
                                    Acciones
                                </th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-proveedor>
                            <tr>
                                <td>{{ proveedor.codigo }}</td>
                                <td>{{ proveedor.nombre }}</td>
                                <td>{{ proveedor.nit }}</td>
                                <td>
                                    <p-tag
                                        [value]="proveedor.tipo"
                                        [severity]="
                                            proveedor.tipo === 'productos'
                                                ? 'success'
                                                : 'info'
                                        "
                                    ></p-tag>
                                </td>
                                <td class="text-center">
                                    <p-tag
                                        [value]="proveedor.estado"
                                        [severity]="
                                            proveedor.estado === 'activo'
                                                ? 'success'
                                                : 'danger'
                                        "
                                    ></p-tag>
                                </td>
                                <td class="flex justify-center space-x-2">
                                    <app-button
                                        icon="pi pi-pencil"
                                        class="p-button-rounded p-button-text p-button-info"
                                        routerLink="edit/{{ proveedor.id }}"
                                    ></app-button>
                                    <app-button
                                        icon="pi pi-trash"
                                        class="p-button-rounded p-button-text p-button-danger"
                                        (clicked)="onDelete(proveedor.id)"
                                    ></app-button>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>

                <div class="md:hidden">
                    <div
                        *ngFor="let proveedor of proveedores"
                        class="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
                    >
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-bold text-gray-800">
                                {{ proveedor.nombre }}
                            </h3>
                            <p-tag
                                [value]="proveedor.estado"
                                [severity]="
                                    proveedor.estado === 'activo'
                                        ? 'success'
                                        : 'danger'
                                "
                            ></p-tag>
                        </div>
                        <div class="text-sm text-gray-600 space-y-1">
                            <p>
                                <strong>Código:</strong> {{ proveedor.codigo }}
                            </p>
                            <p><strong>NIT:</strong> {{ proveedor.nit }}</p>
                            <p>
                                <strong>Tipo:</strong>
                                <p-tag
                                    [value]="proveedor.tipo"
                                    [severity]="
                                        proveedor.tipo === 'productos'
                                            ? 'success'
                                            : 'info'
                                    "
                                ></p-tag>
                            </p>
                        </div>
                        <div class="flex justify-end mt-4 space-x-2">
                            <app-button
                                icon="pi pi-pencil"
                                class="p-button-sm p-button-rounded p-button-text p-button-info"
                                routerLink="edit/{{ proveedor.id }}"
                            ></app-button>
                            <app-button
                                icon="pi pi-trash"
                                class="p-button-sm p-button-rounded p-button-text p-button-danger"
                                (clicked)="onDelete(proveedor.id)"
                            ></app-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [],
    imports: [
        CommonModule,
        TableModule,
        TagModule,
        ButtonComponent,
        RouterModule,
    ],
    providers: [ToastService],
})
export class ProveedoresListComponent implements OnInit {
    proveedores: Proveedor[] = [];
    constructor(
        private proveedoresService: ProveedoresService,
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
                this.proveedoresService.delete(id).subscribe({
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
        this.proveedoresService.getAll().subscribe({
            next: (data) => {
                this.proveedores = data;
            },
            error: (err) => {
                console.error(err);
                this.toastService.listError(err.error?.message || undefined);
            },
        });
    }
}
