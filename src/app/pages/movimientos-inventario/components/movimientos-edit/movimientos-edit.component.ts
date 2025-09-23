import { AuthService } from '@/pages/auth/auth.service';
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
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MovimientosService } from '../../services/movimientos.service';

@Component({
    selector: 'app-movimientos-edit',
    template: `
        <div
            class="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl mx-auto "
        >
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                Editar Movimiento
            </h2>

            <form [formGroup]="form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <app-input-text
                            label="Código"
                            placeholder="MOV001"
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
                            [options]="productos"
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
                            placeholder="REF-2024-001"
                            [formControlInput]="$any(form.get('referencia'))"
                        />
                    </div>

                    <div>
                        <app-input-text
                            label="Número de Documento"
                            placeholder="FAC-001"
                            [formControlInput]="
                                $any(form.get('numeroDocumento'))
                            "
                        />
                    </div>

                    <div>
                        <app-input-text
                            label="Tipo de Documento"
                            placeholder="FAC-001"
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

                <div class="pt-6 flex gap-4">
                    <button
                        pButton
                        type="submit"
                        [disabled]="form.invalid"
                        (click)="onSubmit()"
                        [loading]="loading"
                        class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Actualizar Movimiento
                    </button>

                    <button
                        pButton
                        type="button"
                        (click)="onCancel()"
                        [disabled]="loading"
                        class="flex-1 py-3 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancelar
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
        ButtonModule,
    ],
    providers: [ToastService],
})
export class MovimientosEditComponent implements OnInit {
    @Output() movimientoActualizado = new EventEmitter<any>();

    form: FormGroup;
    movimientoId: number | null = null;

    bodegas: Bodega[] = [];
    productos: Producto[] = [];
    loading = false;

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
        private route: ActivatedRoute,
        private toastService: ToastService,
        private movimientoService: MovimientosService,
        private authService: AuthService,
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
            fechaMovimiento: [new Date(), Validators.required],
            referencia: [null],
            numeroDocumento: [null],
            tipoDocumento: [null],
            observaciones: [null],
            solicitante: [null],
            autorizadorId: [null],
            evidenciaUrl: [null],
        });

        //Transformar a mayusculas el codigo y referencia
        this.form.get('codigo')?.valueChanges.subscribe((value) => {
            if (value) {
                this.form.get('codigo')?.setValue(value.toUpperCase(), {
                    emitEvent: false,
                });
            }
        });
    }

    ngOnInit(): void {
        this.getBodegas();
        this.getProductos();
        this.getMovimientoId();
    }

    private getMovimientoId(): void {
        this.route.params.subscribe((params) => {
            this.movimientoId = params['id'] ? +params['id'] : null;
            if (this.movimientoId) {
                this.cargarMovimiento();
            }
        });
    }

    private cargarMovimiento(): void {
        if (this.movimientoId) {
            this.loading = true;
            this.movimientoService.getById(this.movimientoId).subscribe({
                next: (res) => {
                    this.form.patchValue({
                        ...res,
                        cantidad: parseFloat(res.cantidad.toString()),
                        precioUnitario: res.precioUnitario
                            ? parseFloat(res.precioUnitario.toString())
                            : null,
                        precioTotal: res.precioTotal
                            ? parseFloat(res.precioTotal.toString())
                            : null,
                        fechaMovimiento: new Date(res.fechaMovimiento),
                    });
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error al cargar el movimiento', error);
                    this.toastService.listError(
                        error.error?.message || 'Error al cargar el movimiento',
                    );
                    this.loading = false;
                    this.router.navigate(['/movimientos']);
                },
            });
        }
    }

    getProductos() {
        this.productosService.getAll().subscribe({
            next: (res) => {
                this.productos = res;
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
        this.loading = true;
        if (this.form.valid && this.movimientoId) {
            const value = this.form.value;
            console.log('Datos del formulario:', value);
            this.movimientoService.update(this.movimientoId, value).subscribe({
                next: (res) => {
                    this.toastService.updateSuccess();
                    this.router.navigate(['/movimientos']);
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error al actualizar el movimiento', error);
                    this.toastService.updateError(
                        error.error?.message || undefined,
                    );
                    this.loading = false;
                },
            });
        } else {
            console.error(
                'El formulario no es válido o falta el ID del movimiento',
            );
            this.form.markAllAsTouched();
            this.loading = false;
        }
    }

    onCancel(): void {
        this.router.navigate(['/movimientos']);
    }

    // Helper para verificar si un campo es inválido y fue tocado
    isInvalid(controlName: string): boolean {
        const control = this.form.get(controlName);
        return (
            !!control && control.invalid && (control.dirty || control.touched)
        );
    }
}
