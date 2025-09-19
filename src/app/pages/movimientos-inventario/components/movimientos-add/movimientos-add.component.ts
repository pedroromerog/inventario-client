import { Bodega } from '@/pages/bodegas/interfaces/bodega.interface';
import { BodegasService } from '@/pages/bodegas/services/bodegas.service';
import { Producto } from '@/pages/productos/interfaces/producto.interface';
import { ProductosService } from '@/pages/productos/services/productos.service';
import { DropdownComponent } from '@/shared/components/ui/dropdown/dropdown.component';
import { InputCalendarComponent } from '@/shared/components/ui/input-calendar/input-calendar.component';
import { InputNumberComponent } from '@/shared/components/ui/input-number/input-number.component';
import { InputTextComponent } from '@/shared/components/ui/input-text/input-text.component';
import { TextAreaComponent } from '@/shared/components/ui/text-area/text-area.component';
import {
    EstadoMovimiento,
    MotivoMovimiento,
    TipoMovimiento,
} from '@/shared/enums/movimiento.enums';
import { ToastService } from '@/shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MovimientosService } from '../../services/movimientos.service';

@Component({
    selector: 'app-movimientos-add',
    template: `
        <div
            class="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl mx-auto "
        >
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                Crear Nuevo Movimiento
            </h2>

            <form [formGroup]="form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <app-input-text
                            label="Código"
                            [formControlInput]="$any(form.get('codigo'))"
                        />
                    </div>

                    <div>
                        <app-input-calendar
                            label="Fecha del Movimiento"
                            [formControlInput]="
                                $any(form.get('fechaMovimiento'))
                            "
                        />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <app-dropdown
                            label="Tipo"
                            [formControlInput]="$any(form.get('tipo'))"
                            [options]="tipos"
                        />
                    </div>

                    <div>
                        <app-dropdown
                            label="Estado"
                            [formControlInput]="$any(form.get('estado'))"
                            [options]="estados"
                        />
                    </div>

                    <div>
                        <app-dropdown
                            label="Motivo"
                            [formControlInput]="$any(form.get('motivo'))"
                            [options]="motivos"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <app-dropdown
                            label="Producto"
                            [filter]="true"
                            [formControlInput]="$any(form.get('productoId'))"
                            [options]="prodcutos"
                        />
                    </div>

                    <div>
                        <app-input-number
                            label="Cantidad"
                            [formControlInput]="$any(form.get('cantidad'))"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <app-dropdown
                            [filter]="true"
                            label="Bodega Origen"
                            [formControlInput]="
                                $any(form.get('bodegaOrigenId'))
                            "
                            [options]="bodegas"
                        />
                    </div>
                    <div>
                        <app-dropdown
                            [filter]="true"
                            label="Bodega Destino"
                            [formControlInput]="
                                $any(form.get('bodegaDestinoId'))
                            "
                            [options]="bodegas"
                        />
                    </div>

                    <div>
                        <app-input-number
                            label="Precio Unitario"
                            [formControlInput]="
                                $any(form.get('precioUnitario'))
                            "
                        />
                    </div>

                    <div>
                        <app-input-number
                            label="Precio Total"
                            [formControlInput]="$any(form.get('precioTotal'))"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <app-input-text
                            label="Referencia"
                            [formControlInput]="$any(form.get('referencia'))"
                        />
                    </div>

                    <div>
                        <app-input-text
                            label="Número de Documento"
                            [formControlInput]="
                                $any(form.get('numeroDocumento'))
                            "
                        />
                    </div>

                    <div>
                        <app-input-text
                            label="Tipo de Documento"
                            [formControlInput]="$any(form.get('tipoDocumento'))"
                        />
                    </div>
                </div>

                <div>
                    <app-text-area
                        label="Observaciones"
                        [formControlInput]="$any(form.get('observaciones'))"
                    />
                </div>

                <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            for="solicitante"
                            class="block text-sm font-medium text-gray-700"
                            >Solicitante</label
                        >
                        <input
                            id="solicitante"
                            type="text"
                            formControlName="solicitante"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            for="autorizadorId"
                            class="block text-sm font-medium text-gray-700"
                            >ID del Autorizador</label
                        >
                        <input
                            id="autorizadorId"
                            type="text"
                            formControlName="autorizadorId"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div> -->

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <!-- <div>
                        <app-input-text
                            label="URL de Evidencia"
                            [formControlInput]="$any(form.get('evidenciaUrl'))"
                        />
                    </div> -->

                    <!-- <div class="flex items-center space-x-2">
                        <input
                            id="is_active"
                            type="checkbox"
                            formControlName="is_active"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                            for="is_active"
                            class="text-sm font-medium text-gray-700"
                            >¿Está activo?</label
                        >
                    </div> -->
                </div>

                <div class="pt-6">
                    <button
                        type="submit"
                        [disabled]="form.invalid"
                        (click)="onSubmit()"
                        class="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Crear Movimiento
                    </button>
                </div>
            </form>
        </div>
    `,
    styles: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextComponent,
        InputCalendarComponent,
        DropdownComponent,
        InputNumberComponent,
        TextAreaComponent,
    ],
    providers: [ToastService],
})
export class MovimientosAddComponent implements OnInit {
    @Output() movimientoGuardado = new EventEmitter<any>();

    form: FormGroup;

    bodegas: Bodega[] = [];
    prodcutos: Producto[] = [];

    // Enums para el formulario
    tipoMovimiento = TipoMovimiento;
    estadoMovimiento = EstadoMovimiento;
    motivoMovimiento = MotivoMovimiento;

    // Convertimos los enums en arrays para iterar en la plantilla
    tipos = Object.values(this.tipoMovimiento);
    estados = Object.values(this.estadoMovimiento);
    motivos = Object.values(this.motivoMovimiento);

    constructor(
        private fb: FormBuilder,
        private bodegaService: BodegasService,
        private productosService: ProductosService,
        private router: Router,
        private toastService: ToastService,
        private movimientoService: MovimientosService,
    ) {
        this.form = this.fb.group({
            codigo: ['', Validators.required],
            tipo: [TipoMovimiento.TRANSFERENCIA, Validators.required],
            estado: [EstadoMovimiento.PENDIENTE, Validators.required],
            motivo: [
                MotivoMovimiento.TRANSFERENCIA_BODEGA,
                Validators.required,
            ],
            bodegaOrigenId: [null],
            bodegaDestinoId: [null],
            productoId: ['', Validators.required],
            cantidad: [0, [Validators.required, Validators.min(0.01)]],
            precioUnitario: [null],
            precioTotal: [null],
            fechaMovimiento: [
                new Date().toISOString().substring(0, 10),
                Validators.required,
            ],
            referencia: [null],
            numeroDocumento: [null],
            tipoDocumento: [null],
            observaciones: [null],
            solicitante: [null],
            autorizadorId: [null],
            evidenciaUrl: [null],
            // is_active: [true],
        });
    }

    ngOnInit(): void {
        this.getBodegas();
        this.getProductos();
    }

    getProductos() {
        this.productosService.getAll().subscribe({
            next: (res) => {
                this.prodcutos = res;
            },
            error: (error) => {
                this.toastService.listError(
                    error.error?.message || 'Error al cargar los productos',
                );
            },
        });
    }

    getBodegas() {
        this.bodegaService.getAll().subscribe({
            next: (res) => {
                this.bodegas = res;
            },
            error: (error) => {
                console.error('Error al cargar las bodegas', error);
                this.toastService.listError(
                    error.error?.message || 'Error al cargar las bodegas',
                );
            },
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            console.log('Datos del formulario:', this.form.value);
            this.movimientoService.create(this.form.value).subscribe({
                next: (res) => {
                    this.toastService.createSuccess();
                    this.router.navigate(['/movimientos']);
                },
                error: (error) => {
                    console.error('Error al crear el movimiento', error);
                    this.toastService.createError(
                        error.error?.message || undefined,
                    );
                },
            });
        } else {
            console.error('El formulario no es válido');
            this.form.markAllAsTouched();
        }
    }

    // Helper para verificar si un campo es inválido y fue tocado
    isInvalid(controlName: string): boolean {
        const control = this.form.get(controlName);
        return (
            !!control && control.invalid && (control.dirty || control.touched)
        );
    }
}
