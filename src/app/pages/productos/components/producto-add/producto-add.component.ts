import { Categoria } from '@/pages/categorias/interfaces/categorias.interface';
import { CategoriasService } from '@/pages/categorias/services/categorias.service';
import { Proveedor } from '@/pages/proveedores/interfaces/proveedor.interface';
import { ProveedoresService } from '@/pages/proveedores/services/proveedores.service';
import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { DropdownComponent } from '@/shared/components/ui/dropdown/dropdown.component';
import { InputNumberComponent } from '@/shared/components/ui/input-number/input-number.component';
import { InputTextComponent } from '@/shared/components/ui/input-text/input-text.component';
import { TextAreaComponent } from '@/shared/components/ui/text-area/text-area.component';
import {
    EstadoProducto,
    TipoProducto,
    UnidadMedida,
} from '@/shared/enums/producto.enums';
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
import { CheckboxModule } from 'primeng/checkbox';
import { ProductosService } from '../../services/productos.service';
import { CheckboxComponent } from '@/shared/components/ui/checkbox/checkbox.component';
import { ButtonCancelComponent } from '@/shared/components/ui/button-cancel/button-cancel.component';

@Component({
    selector: 'app-producto-add',
    template: `
        <div class="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ productoId ? 'Actualizar ' : 'Crear Nuevo' }} Producto
            </h2>

            <form [formGroup]="form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-input-text
                        label="Código"
                        [formControlInput]="$any(form.get('codigo'))"
                    />
                    <app-input-text
                        label="Nombre"
                        [formControlInput]="$any(form.get('nombre'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <app-dropdown
                        label="Tipo"
                        [formControlInput]="$any(form.get('tipo'))"
                        [options]="tipos"
                    />
                    <app-dropdown
                        label="Estado"
                        [formControlInput]="$any(form.get('estado'))"
                        [options]="estados"
                    />
                    <app-dropdown
                        label="Unidad de Medida"
                        [formControlInput]="$any(form.get('unidadMedida'))"
                        [options]="unidades"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <app-input-number
                        [mode]="'decimal'"
                        [minFractionDigits]="1"
                        label="Precio de Compra"
                        [formControlInput]="$any(form.get('precioCompra'))"
                    />
                    <app-input-number
                        [mode]="'decimal'"
                        [minFractionDigits]="1"
                        label="Precio de Venta"
                        [formControlInput]="$any(form.get('precioVenta'))"
                    />
                    <app-input-number
                        mode="decimal"
                        [minFractionDigits]="1"
                        label="Stock Mínimo"
                        [formControlInput]="$any(form.get('stockMinimo'))"
                    />
                    <app-input-number
                        [mode]="'decimal'"
                        [minFractionDigits]="1"
                        label="Stock Máximo"
                        [formControlInput]="$any(form.get('stockMaximo'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-dropdown
                        label="Categoría"
                        [formControlInput]="$any(form.get('categoriaId'))"
                        [options]="categorias"
                        [filter]="true"
                    />
                    <app-dropdown
                        label="Proveedor"
                        [formControlInput]="$any(form.get('proveedorId'))"
                        [options]="proveedores"
                        [filter]="true"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <app-input-text
                        label="Marca"
                        [formControlInput]="$any(form.get('marca'))"
                    />
                    <app-input-text
                        label="Modelo"
                        [formControlInput]="$any(form.get('modelo'))"
                    />
                    <app-input-text
                        label="Color"
                        [formControlInput]="$any(form.get('color'))"
                    />
                </div>
                <div class="grid grid-cols-1  gap-4">
                    <app-text-area
                        label="Descripción"
                        [rows]="3"
                        [formControlInput]="$any(form.get('descripcion'))"
                    />
                    <app-text-area
                        label="Especificaciones"
                        [rows]="3"
                        [formControlInput]="$any(form.get('especificaciones'))"
                    />
                    <app-text-area
                        label="Notas"
                        [rows]="3"
                        [formControlInput]="$any(form.get('notas'))"
                    />
                    <app-text-area
                        [rows]="3"
                        label="Instrucciones"
                        [formControlInput]="$any(form.get('instrucciones'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <app-checkbox
                        label=" ¿Requiere refrigeración?"
                        [formControlInput]="
                            $any(form.get('requiereRefrigeracion'))
                        "
                    />

                    <app-checkbox
                        label="¿Es frágil?"
                        [formControlInput]="$any(form.get('esFragil'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <app-checkbox
                        label="¿Es peligroso?"
                        [formControlInput]="$any(form.get('esPeligroso'))"
                    />

                    <div>
                        <app-input-number
                            label="Días de Vida Útil"
                            [formControlInput]="$any(form.get('diasVidaUtil'))"
                        />
                    </div>
                </div>

                <div class="pt-6 flex justify-end space-x-4">
                    <app-button-cancel (clicked)="onCancel()" />
                    <app-button
                        label="{{
                            productoId ? 'Actualizar ' : 'Crear'
                        }} Producto"
                        icon="pi pi-check"
                        [disabled]="form.invalid"
                        (click)="onSave()"
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
        CheckboxModule,
        ButtonComponent,
        CheckboxComponent,
        ButtonCancelComponent,
    ],
    providers: [ToastService],
})
export class ProductoAddComponent implements OnInit {
    form: FormGroup;
    productoId: number | null = null;
    proveedores: Proveedor[] = [];

    tipoProducto = TipoProducto;
    estadoProducto = EstadoProducto;
    unidadMedida = UnidadMedida;

    tipos = Object.values(this.tipoProducto);
    estados = Object.values(this.estadoProducto);
    unidades = Object.values(this.unidadMedida);

    // Estos datos se obtendrían de tu API
    categorias: Categoria[] = [];

    constructor(
        private fb: FormBuilder,
        private productosService: ProductosService,
        private proveedoresService: ProveedoresService,
        private categoriasService: CategoriasService,
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
    ) {
        this.form = this.fb.group({
            codigo: ['', Validators.required],
            nombre: ['', Validators.required],
            descripcion: [null],
            tipo: [null, Validators.required],
            estado: [null, Validators.required],
            unidadMedida: [null, Validators.required],
            categoriaId: [null],
            proveedorId: [null],
            precioCompra: [null, Validators.min(0)],
            precioVenta: [null, Validators.min(0)],
            stockMinimo: [0, Validators.required],
            stockMaximo: [0, Validators.required],
            marca: [null],
            modelo: [null],
            color: [null],
            dimensiones: [null],
            peso: [null],
            especificaciones: [null],
            instrucciones: [null],
            notas: [null],
            requiereRefrigeracion: [false],
            esFragil: [false],
            esPeligroso: [false],
            diasVidaUtil: [0],
            imagenUrl: [null],
            // is_active: [true],
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.productoId = id ? +id : null;
        this.getData();
        this.getProveedores();
        this.getCategorias();
    }

    getProveedores() {
        this.proveedoresService.getAll().subscribe({
            next: (res) => {
                this.proveedores = res;
            },
            error: (err) => {
                console.error(err);
                this.toastService.error(
                    'list',
                    err.error?.message || 'Error al cargar proveedores',
                );
            },
        });
    }

    getCategorias() {
        this.categoriasService.getAll().subscribe({
            next: (res) => {
                this.categorias = res;
            },
            error: (err) => {
                console.error(err);
                this.toastService.error(
                    'list',
                    err.error?.message || 'Error al cargar categorías',
                );
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
                this.router.navigate(['/productos']);
            },
        });
    }

    getData() {
        if (!this.productoId) {
            return;
        }
        this.productosService.getById(this.productoId).subscribe({
            next: (res) => {
                console.log(res);
                this.form.patchValue({
                    ...res,
                    precioCompra: res.precioCompra
                        ? parseFloat(res.precioCompra as any)
                        : null,
                    precioVenta: res.precioCompra
                        ? parseFloat(res.precioVenta as any)
                        : null,
                    stockMinimo: parseFloat(res.stockMinimo as any),
                    stockMaximo: parseFloat(res.stockMaximo as any),
                });
            },
            error: (err) => {
                console.error(err);
                this.toastService.error(
                    'list',
                    err.error?.message || undefined,
                );
                // this.router.navigate(['/proveedores']);
            },
        });
    }

    onDelete() {
        if (!this.productoId) {
            this.toastService.error('delete', 'No hay producto para eliminar');
            return;
        }

        this.confirmationService.confirm({
            message: '¿Está seguro de eliminar este producto?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (!this.productoId) {
                    return;
                }
                this.productosService.delete(this.productoId).subscribe({
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

    onSave() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.productoId) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        const value = this.form.value;
        this.productosService.create(value).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.createSuccess();
                this.router.navigate(['/productos']);
            },
            error: (err) => {
                console.error(err);
                this.toastService.createError(err.error?.message || undefined);
            },
        });
    }

    update() {
        const value = this.form.value;
        if (!this.productoId) {
            return;
        }
        this.productosService.update(this.productoId, value).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.updateSuccess();
                this.router.navigate(['/productos']);
            },
            error: (err) => {
                console.error(err);
                this.toastService.updateError(err.error?.message || undefined);
            },
        });
    }
}
