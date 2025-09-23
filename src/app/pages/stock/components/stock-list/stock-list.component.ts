import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { EstadoStock } from '@/shared/enums/stock.enums';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Stock } from '../../interfaces/stock.interface';
import { StockService } from '../../services/stock.service';
import { ToastService } from '@/shared/services/toast.service';

@Component({
    selector: 'app-stock-list',
    template: `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    Gestión de Stock
                </h2>
                <!-- <app-button
                    label="Ajustar Stock"
                    icon="pi pi-plus"
                    class="p-button-primary"
                    routerLink="add"
                ></app-button> -->
            </div>

            <div class="hidden md:block">
                <p-table
                    [value]="stockList"
                    [paginator]="true"
                    [rows]="10"
                    [showCurrentPageReport]="true"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                    [tableStyle]="{ 'min-width': '50rem' }"
                >
                    <ng-template pTemplate="header">
                        <tr>
                            <th class="text-left font-semibold text-gray-600">
                                Producto
                            </th>
                            <th class="text-left font-semibold text-gray-600">
                                Bodega
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Stock Actual
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Reservado
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Disponible
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Estado
                            </th>
                            <th class="text-center font-semibold text-gray-600">
                                Acciones
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-stock>
                        <tr>
                            <td>{{ stock.producto.nombre }}</td>
                            <td>{{ stock.bodega.nombre }}</td>
                            <td class="text-center">{{ stock.stockActual }}</td>
                            <td class="text-center">
                                {{ stock.stockReservado }}
                            </td>
                            <td class="text-center">
                                {{ stock.stockDisponible }}
                            </td>
                            <td class="text-center">
                                <p-tag
                                    [value]="stock.estado | titlecase"
                                    [severity]="getSeverityEstado(stock.estado)"
                                ></p-tag>
                            </td>
                            <td class="flex justify-center space-x-2">
                                <!-- <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="info"
                                    icon="pi pi-eye"
                                    pTooltip="Ver detalles"
                                    [routerLink]="'view/' + stock.id"
                                ></app-button>
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="warn"
                                    icon="pi pi-pencil"
                                    pTooltip="Ajustar stock"
                                    [routerLink]="'edit/' + stock.id"
                                ></app-button>
                                <app-button
                                    [text]="true"
                                    [rounded]="true"
                                    severity="danger"
                                    icon="pi pi-trash"
                                    pTooltip="Eliminar"
                                    (clicked)="onDelete(stock.id)"
                                ></app-button> -->
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>

            <div class="md:hidden">
                <div
                    *ngFor="let stock of stockList"
                    class="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
                >
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg font-bold text-gray-800">
                            {{ stock.producto.nombre }}
                        </h3>
                        <p-tag
                            [value]="stock.estado | titlecase"
                            [severity]="getSeverityEstado(stock.estado)"
                        ></p-tag>
                    </div>
                    <div class="text-sm text-gray-600 space-y-1">
                        <p>
                            <strong>Bodega:</strong> {{ stock.bodega.nombre }}
                        </p>
                        <p>
                            <strong>Stock Actual:</strong>
                            {{ stock.stockActual }}
                        </p>
                        <p>
                            <strong>Stock Disponible:</strong>
                            {{ stock.stockDisponible }}
                        </p>
                    </div>
                    <div class="flex justify-end mt-4 space-x-2">
                        <!-- <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="info"
                            icon="pi pi-eye"
                            [routerLink]="'view/' + stock.id"
                        ></app-button>
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="warn"
                            icon="pi pi-pencil"
                            [routerLink]="'edit/' + stock.id"
                        ></app-button>
                        <app-button
                            [text]="true"
                            [rounded]="true"
                            severity="danger"
                            icon="pi pi-trash"
                            (clicked)="onDelete(stock.id)"
                        ></app-button> -->
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
    providers: [ConfirmationService],
})
export class StockListComponent implements OnInit {
    stockList: Stock[] = [];

    constructor(
        private stockService: StockService,
        private confirmationService: ConfirmationService,
        private toastService: ToastService,
    ) {}

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.stockService.getAll().subscribe({
            next: (data: Stock[]) => {
                this.stockList = data;
            },
            error: (err) => {
                console.error(err);
                this.toastService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo cargar el stock.',
                });
            },
        });
    }

    onDelete(id: number) {
        this.confirmationService.confirm({
            message: '¿Está seguro de eliminar este registro de stock?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.stockService.delete(id).subscribe({
                    next: () => {
                        this.toastService.add({
                            severity: 'success',
                            summary: 'Eliminado',
                            detail: 'Registro de stock eliminado correctamente.',
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
                                'No se pudo eliminar el registro.',
                        });
                    },
                });
            },
        });
    }

    getSeverityEstado(estado: EstadoStock): string {
        switch (estado) {
            case EstadoStock.DISPONIBLE:
                return 'success';
            case EstadoStock.AGOTADO:
                return 'danger';
            case EstadoStock.RESERVADO:
                return 'info';
            default:
                return 'secondary';
        }
    }
}
