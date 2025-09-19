import { EstadoEmpleado, TipoEmpleado } from '@/shared/enums/empleado.enums';
import { ToastService } from '@/shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadosService } from '../../services/empleados.service';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { Tag } from 'primeng/tag';
import { ButtonViewComponent } from '@/shared/components/ui/button-view/button-view.component';
import { ButtonEditComponent } from '@/shared/components/ui/button-edit/button-edit.component';
import { ButtonDeleteComponent } from '@/shared/components/ui/button-delete/button-delete.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-empleados-list',
    template: `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    Lista de Empleados 🧑‍💼
                </h2>
                <app-button
                    label="Nuevo Empleado"
                    icon="pi pi-plus"
                    class="p-button-primary"
                    routerLink="add"
                ></app-button>
            </div>

            <div class="hidden md:block">
                <p-table
                    [value]="empleados"
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
                                Email
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Cargo
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Tipo
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Estado
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Acciones
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-empleado>
                        <tr>
                            <td>{{ empleado.codigo }}</td>
                            <td>
                                {{ empleado.nombres }} {{ empleado.apellidos }}
                            </td>
                            <td>{{ empleado.email }}</td>
                            <td>{{ empleado.cargo }}</td>
                            <td>
                                <p-tag
                                    [value]="empleado.tipo | titlecase"
                                    [severity]="getSeverityTipo(empleado.tipo)"
                                ></p-tag>
                            </td>
                            <td class="text-center">
                                <p-tag
                                    [value]="empleado.estado | titlecase"
                                    [severity]="
                                        getSeverityEstado(empleado.estado)
                                    "
                                ></p-tag>
                            </td>
                            <td class="flex justify-center space-x-2">
                                <app-button-view
                                    [routerLink]="'view/' + empleado.id"
                                ></app-button-view>
                                <app-button-edit
                                    [routerLink]="'edit/' + empleado.id"
                                ></app-button-edit>
                                <app-button-delete
                                    (clicked)="onDelete(empleado.id)"
                                ></app-button-delete>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>

            <div class="md:hidden">
                <div
                    *ngFor="let empleado of empleados"
                    class="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
                >
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg font-bold text-gray-800">
                            {{ empleado.nombres }} {{ empleado.apellidos }}
                        </h3>
                        <p-tag
                            [value]="empleado.estado | titlecase"
                            [severity]="getSeverityEstado(empleado.estado)"
                        ></p-tag>
                    </div>
                    <div class="text-sm text-gray-600 space-y-1">
                        <p><strong>Código:</strong> {{ empleado.codigo }}</p>
                        <p><strong>Email:</strong> {{ empleado.email }}</p>
                        <p><strong>Cargo:</strong> {{ empleado.cargo }}</p>
                        <p>
                            <strong>Tipo:</strong>
                            <p-tag
                                [value]="empleado.tipo | titlecase"
                                [severity]="getSeverityTipo(empleado.tipo)"
                            ></p-tag>
                        </p>
                    </div>
                    <div class="flex justify-end mt-4 space-x-2">
                        <app-button-view
                            [routerLink]="'view/' + empleado.id"
                        ></app-button-view>
                        <app-button-edit
                            [routerLink]="'edit/' + empleado.id"
                        ></app-button-edit>
                        <app-button-delete
                            (clicked)="onDelete(empleado.id)"
                        ></app-button-delete>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [],
    imports: [
        CommonModule,
        RouterLink,
        TableModule,
        ButtonComponent,
        Tag,
        ButtonViewComponent,
        ButtonEditComponent,
        ButtonDeleteComponent,
    ],
    providers: [ToastService],
})
export class EmpleadosListComponent implements OnInit {
    empleados: Empleado[] = [];

    constructor(
        private empleadosService: EmpleadosService,
        private confirmationService: ConfirmationService,
        private messageService: ToastService,
    ) {}

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.empleadosService.getAll().subscribe({
            next: (data: Empleado[]) => {
                this.empleados = data;
            },
            error: (err) => {
                console.error(err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar los empleados.',
                });
            },
        });
    }

    onDelete(id: number) {
        this.confirmationService.confirm({
            message: '¿Está seguro de eliminar este empleado?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.empleadosService.delete(id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Eliminado',
                            detail: 'Empleado eliminado correctamente.',
                        });
                        this.getData();
                    },
                    error: (err) => {
                        console.error(err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail:
                                err.error?.message ||
                                'No se pudo eliminar el empleado.',
                        });
                    },
                });
            },
        });
    }

    getSeverityEstado(estado: EstadoEmpleado): string {
        switch (estado) {
            case EstadoEmpleado.ACTIVO:
                return 'success';
            case EstadoEmpleado.INACTIVO:
            case EstadoEmpleado.SUSPENDIDO:
                return 'danger';
            case EstadoEmpleado.VACACIONES:
            case EstadoEmpleado.LICENCIA:
                return 'info';
            default:
                return 'secondary';
        }
    }

    getSeverityTipo(tipo: TipoEmpleado): string {
        switch (tipo) {
            case TipoEmpleado.ADMINISTRATIVO:
            case TipoEmpleado.GERENTE:
                return 'info';
            case TipoEmpleado.OPERATIVO:
                return 'warning';
            case TipoEmpleado.SUPERVISOR:
                return 'success';
            default:
                return 'secondary';
        }
    }
}
