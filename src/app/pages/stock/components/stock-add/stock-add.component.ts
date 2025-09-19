import { Bodega } from '@/pages/bodegas/interfaces/bodega.interface';
import { BodegasService } from '@/pages/bodegas/services/bodegas.service';
import { Producto } from '@/pages/productos/interfaces/producto.interface';
import { ProductosService } from '@/pages/productos/services/productos.service';
import { ButtonCancelComponent } from '@/shared/components/ui/button-cancel/button-cancel.component';
import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { CheckboxComponent } from '@/shared/components/ui/checkbox/checkbox.component';
import { DropdownComponent } from '@/shared/components/ui/dropdown/dropdown.component';
import { InputNumberComponent } from '@/shared/components/ui/input-number/input-number.component';
import { InputTextComponent } from '@/shared/components/ui/input-text/input-text.component';
import { TextAreaComponent } from '@/shared/components/ui/text-area/text-area.component';
import { EstadoStock } from '@/shared/enums/stock.enums';
import { ToastService } from '@/shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { StockService } from '../../services/stock.service';

@Component({
    selector: 'app-stock-add',
    template: `
        <div class="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ stockId ? 'Actualizar' : 'Crear Nuevo' }} Registro de Stock
                📊
            </h2>

            <form [formGroup]="form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-dropdown
                        label="Producto"
                        [formControlInput]="$any(form.get('productoId'))"
                        [options]="productos"
                        [filter]="true"
                        optionLabel="nombre"
                        optionValue="id"
                    />
                    <app-dropdown
                        label="Bodega"
                        [formControlInput]="$any(form.get('bodegaId'))"
                        [options]="bodegas"
                        [filter]="true"
                        optionLabel="nombre"
                        optionValue="id"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-input-number
                        label="Stock Actual"
                        [formControlInput]="$any(form.get('stockActual'))"
                    />
                    <app-input-number
                        label="Stock Reservado"
                        [formControlInput]="$any(form.get('stockReservado'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-input-number
                        label="Stock Mínimo"
                        [formControlInput]="$any(form.get('stockMinimo'))"
                    />
                    <app-input-number
                        label="Stock Máximo"
                        [formControlInput]="$any(form.get('stockMaximo'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-dropdown
                        label="Estado"
                        [formControlInput]="$any(form.get('estado'))"
                        [options]="estados"
                    />
                    <!-- <app-checkbox
                        label="¿Está activo?"
                        [formControlInput]="$any(form.get('isActive'))"
                    /> -->
                </div>

                <app-text-area
                    label="Observaciones"
                    [rows]="3"
                    [formControlInput]="$any(form.get('observaciones'))"
                />

                <div class="pt-6 flex justify-end space-x-4">
                    <app-button-cancel (clicked)="onCancel()" />
                    <app-button
                        label="{{ stockId ? 'Actualizar' : 'Crear' }} Stock"
                        icon="pi pi-check"
                        [disabled]="form.invalid"
                        (clicked)="onSave()"
                    ></app-button>
                </div>
            </form>
        </div>
    `,
    styles: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextComponent,
        DropdownComponent,
        InputNumberComponent,
        TextAreaComponent,
        CheckboxComponent,
        ButtonComponent,
        ButtonCancelComponent,
    ],
    standalone: true,
    providers: [ToastService],
})
export class StockAddComponent implements OnInit {
    form: FormGroup;
    stockId: number | null = null;
    productos: Producto[] = [];
    bodegas: Bodega[] = [];
    estados = Object.values(EstadoStock);

    constructor(
        private fb: FormBuilder,
        private productosService: ProductosService,
        private bodegasService: BodegasService,
        private stockService: StockService,
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
    ) {
        this.form = this.fb.group({
            productoId: [null, Validators.required],
            bodegaId: [null, Validators.required],
            stockActual: [0, [Validators.required, Validators.min(0)]],
            stockReservado: [0, [Validators.required, Validators.min(0)]],
            stockMinimo: [0, [Validators.required, Validators.min(0)]],
            stockMaximo: [0, [Validators.required, Validators.min(0)]],
            estado: [EstadoStock.DISPONIBLE, Validators.required],
            observaciones: [''],
            // isActive: [true],
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.stockId = id ? +id : null;
        this.loadDataForDropdowns();

        if (this.stockId) {
            this.loadStockData();
        }
    }

    loadDataForDropdowns() {
        this.productosService.getAll().subscribe({
            next: (res) => (this.productos = res),
            error: (err) => {
                this.toastService.listError('Error al cargar productos');
                console.error(err);
            },
        });

        this.bodegasService.getAll().subscribe({
            next: (res) => (this.bodegas = res),
            error: (err) => {
                this.toastService.listError('Error al cargar bodegas');
                console.error(err);
            },
        });
    }

    loadStockData() {
        if (!this.stockId) return;

        this.stockService.getById(this.stockId).subscribe({
            next: (res) => {
                this.form.patchValue({
                    ...res,
                    stockReservado: res.stockReservado
                        ? parseFloat(res.stockReservado.toString())
                        : null,
                    stockMinimo: res.stockMinimo
                        ? parseFloat(res.stockMinimo.toString())
                        : null,
                    stockMaximo: res.stockMaximo
                        ? parseFloat(res.stockMaximo.toString())
                        : null,
                    stockActual: res.stockActual
                        ? parseFloat(res.stockActual.toString())
                        : null,
                });
            },
            error: (err) => {
                this.toastService.listError('Error al cargar el stock');
                this.router.navigate(['/stock']);
            },
        });
    }

    onCancel() {
        this.confirmationService.confirm({
            message:
                '¿Está seguro de cancelar? Se perderán los cambios no guardados.',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.router.navigate(['/stock']);
            },
        });
    }

    onSave() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.toastService.error(
                'create',
                'Por favor, revise los campos marcados en rojo.',
            );
            return;
        }

        if (this.stockId) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        this.stockService.create(this.form.value).subscribe({
            next: () => {
                this.toastService.createSuccess();
                this.router.navigate(['/stock']);
            },
            error: (err) => {
                this.toastService.createError(err.error?.message || undefined);
                console.error(err);
            },
        });
    }

    update() {
        if (!this.stockId) return;
        this.stockService.update(this.stockId, this.form.value).subscribe({
            next: () => {
                this.toastService.updateSuccess();
                this.router.navigate(['/stock']);
            },
            error: (err) => {
                this.toastService.updateError(err.error?.message || undefined);
                console.error(err);
            },
        });
    }
}
