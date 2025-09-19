import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { EstadoUsuario } from '@/shared/enums/user.enums';
import { ToastService } from '@/shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
    selector: 'app-usuarios-list',
    template: `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    Lista de Usuarios
                </h2>
                <app-button
                    label="Nuevo Usuario"
                    icon="pi pi-plus"
                    class="p-button-primary"
                    routerLink="add"
                ></app-button>
            </div>

            <div class="hidden md:block">
                <p-table
                    [value]="usuarios"
                    [paginator]="true"
                    [rows]="10"
                    [showCurrentPageReport]="true"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                    [tableStyle]="{ 'min-width': '50rem' }"
                >
                    <ng-template pTemplate="header">
                        <tr>
                            <th class="text-left font-semibold text-gray-600">
                                Username
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Nombre Completo
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Email
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Rol
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Estado
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Acciones
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-usuario>
                        <tr>
                            <td>{{ usuario.username }}</td>
                            <td>{{ usuario.nombre }} {{ usuario.apellido }}</td>
                            <td>{{ usuario.email }}</td>
                            <td>{{ usuario.rol?.nombre }}</td>
                            <td class="text-center">
                                <p-tag
                                    [value]="usuario.estado | titlecase"
                                    [severity]="
                                        getSeverityEstado(usuario.estado)
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
                                    [routerLink]="'view/' + usuario.id"
                                ></app-button>
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="warn"
                                    icon="pi pi-pencil"
                                    pTooltip="Editar"
                                    [routerLink]="'edit/' + usuario.id"
                                ></app-button>
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="danger"
                                    icon="pi pi-trash"
                                    pTooltip="Eliminar"
                                    (clicked)="onDelete(usuario.id)"
                                ></app-button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>

            <div class="md:hidden">
                <div
                    *ngFor="let usuario of usuarios"
                    class="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
                >
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg font-bold text-gray-800">
                            {{ usuario.nombre }} {{ usuario.apellido }}
                        </h3>
                        <p-tag
                            [value]="usuario.estado | titlecase"
                            [severity]="getSeverityEstado(usuario.estado)"
                        ></p-tag>
                    </div>
                    <div class="text-sm text-gray-600 space-y-1">
                        <p><strong>Username:</strong> {{ usuario.username }}</p>
                        <p><strong>Email:</strong> {{ usuario.email }}</p>
                        <p><strong>Rol:</strong> {{ usuario.rol?.nombre }}</p>
                    </div>
                    <div class="flex justify-end mt-4 space-x-2">
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="info"
                            icon="pi pi-eye"
                            [routerLink]="'view/' + usuario.id"
                        ></app-button>
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="warn"
                            icon="pi pi-pencil"
                            [routerLink]="'edit/' + usuario.id"
                        ></app-button>
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="danger"
                            icon="pi pi-trash"
                            (clicked)="onDelete(usuario.id)"
                        ></app-button>
                    </div>
                </div>
            </div>
            <p-confirmDialog></p-confirmDialog>
            <p-toast></p-toast>
        </div>
    `,
    styles: [],
    imports: [
        CommonModule,
        RouterModule,
        TableModule,
        TagModule,
        ButtonComponent,
        ToastModule,
        ConfirmDialogModule,
        TooltipModule,
    ],
    standalone: true,
    providers: [ToastService],
})
export class UsuariosListComponent implements OnInit {
    usuarios: Usuario[] = [];

    constructor(
        private usuariosService: UsuariosService,
        private confirmationService: ConfirmationService,
        private messageService: ToastService,
    ) {}

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.usuariosService.getAll().subscribe({
            next: (data: Usuario[]) => {
                this.usuarios = data;
            },
            error: (err) => {
                console.error(err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar los usuarios.',
                });
            },
        });
    }

    onDelete(id: string) {
        this.confirmationService.confirm({
            message: '¿Está seguro de eliminar este usuario?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usuariosService.delete(id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Eliminado',
                            detail: 'Usuario eliminado correctamente.',
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
                                'No se pudo eliminar el usuario.',
                        });
                    },
                });
            },
        });
    }

    getSeverityEstado(estado: EstadoUsuario): string {
        switch (estado) {
            case EstadoUsuario.ACTIVO:
                return 'success';
            case EstadoUsuario.INACTIVO:
                return 'danger';
            case EstadoUsuario.SUSPENDIDO:
                return 'warning';
            case EstadoUsuario.PENDIENTE_ACTIVACION:
                return 'info';
            default:
                return 'secondary';
        }
    }
}
