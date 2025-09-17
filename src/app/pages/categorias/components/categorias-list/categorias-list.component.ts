import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { ToastService } from '@/shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Categoria } from '../../interfaces/categorias.interface';
import { CategoriasService } from '../../services/categorias.service';
import { EstadoCategoria, TipoCategoria } from '@/shared/enums/categoria.enums';

@Component({
    selector: 'app-categorias-list',
    template: `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    Lista de Categorías 📚
                </h2>
                <app-button
                    label="Nueva Categoría"
                    icon="pi pi-plus"
                    class="p-button-primary"
                    routerLink="add"
                ></app-button>
            </div>

            <div class="hidden md:block">
                <p-table
                    [value]="categorias"
                    [paginator]="true"
                    [rows]="10"
                    [showCurrentPageReport]="true"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                    [tableStyle]="{ 'min-width': '50rem' }"
                >
                    <ng-template pTemplate="header">
                        <tr>
                            <th class="text-left font-semibold text-gray-600">
                                Color
                            </th>
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
                                Orden
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Estado
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Acciones
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-categoria>
                        <tr>
                            <td>
                                <div
                                    class="rounded-full w-7 h-7 "
                                    [ngStyle]="{
                                        'background-color': categoria.color,
                                    }"
                                ></div>
                            </td>
                            <td>{{ categoria.codigo }}</td>
                            <td>{{ categoria.nombre }}</td>
                            <td>
                                <p-tag
                                    [value]="categoria.tipo | titlecase"
                                    [severity]="getSeverityTipo(categoria.tipo)"
                                ></p-tag>
                            </td>
                            <td>{{ categoria.orden }}</td>
                            <td class="text-center">
                                <p-tag
                                    [value]="categoria.estado | titlecase"
                                    [severity]="
                                        getSeverityEstado(categoria.estado)
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
                                    [routerLink]="'view/' + categoria.id"
                                ></app-button>
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="warn"
                                    icon="pi pi-pencil"
                                    pTooltip="Editar"
                                    [routerLink]="'edit/' + categoria.id"
                                ></app-button>
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="danger"
                                    icon="pi pi-trash"
                                    pTooltip="Eliminar"
                                    (clicked)="onDelete(categoria.id)"
                                ></app-button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>

            <div class="md:hidden">
                <div
                    *ngFor="let categoria of categorias"
                    class="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
                >
                    <div class="flex justify-between items-center mb-2">
                        <h3
                            class="flex items-center gap-1 text-lg font-bold text-gray-800"
                        >
                            <div
                                class="rounded-full w-7 h-7 "
                                [ngStyle]="{
                                    'background-color': categoria.color,
                                }"
                            ></div>
                            {{ categoria.nombre }}
                        </h3>
                        <p-tag
                            [value]="categoria.estado | titlecase"
                            [severity]="getSeverityEstado(categoria.estado)"
                        ></p-tag>
                    </div>
                    <div class="text-sm text-gray-600 space-y-1">
                        <p><strong>Código:</strong> {{ categoria.codigo }}</p>
                        <p>
                            <strong>Tipo:</strong>
                            <p-tag
                                [value]="categoria.tipo | titlecase"
                                [severity]="getSeverityTipo(categoria.tipo)"
                            ></p-tag>
                        </p>
                        <p><strong>Orden:</strong> {{ categoria.orden }}</p>
                    </div>
                    <div class="flex justify-end mt-4 space-x-2">
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="info"
                            icon="pi pi-eye"
                            [routerLink]="'view/' + categoria.id"
                        ></app-button>
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="warn"
                            icon="pi pi-pencil"
                            [routerLink]="'edit/' + categoria.id"
                        ></app-button>
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="danger"
                            icon="pi pi-trash"
                            (clicked)="onDelete(categoria.id)"
                        ></app-button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [],
    imports: [
        ButtonComponent,
        TableModule,
        TagModule,
        RouterModule,
        CommonModule,
    ],
    providers: [ToastService],
})
export class CategoriasListComponent implements OnInit {
    categorias: Categoria[] = [];
    constructor(
        private categoriasService: CategoriasService,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit() {
        this.getData();
    }

    onDelete(id: number) {
        this.confirmationService.confirm({
            message: '¿Está seguro de eliminar esta Categoría?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriasService.delete(id).subscribe({
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
        this.categoriasService.getAll().subscribe({
            next: (data) => {
                this.categorias = data;
            },
            error: (err) => {
                this.toastService.listError(err.error?.message || undefined);
            },
        });
    }

    getSeverityEstado(estado: EstadoCategoria): string {
        switch (estado) {
            case EstadoCategoria.ACTIVA:
                return 'success';
            case EstadoCategoria.INACTIVA:
            case EstadoCategoria.ARCHIVADA:
                return 'danger';
            case EstadoCategoria.EN_REVISION:
                return 'warning';
            default:
                return 'secondary';
        }
    }

    getSeverityTipo(tipo: TipoCategoria): string {
        switch (tipo) {
            case TipoCategoria.PRODUCTO:
            case TipoCategoria.EQUIPO:
            case TipoCategoria.HERRAMIENTA:
                return 'info';
            case TipoCategoria.SERVICIO:
            case TipoCategoria.MATERIAL:
            case TipoCategoria.CONSUMIBLE:
            case TipoCategoria.REPUESTO:
                return 'warning';
            default:
                return 'secondary';
        }
    }
}
