import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { DropdownComponent } from '@/shared/components/ui/dropdown/dropdown.component';
import { InputNumberComponent } from '@/shared/components/ui/input-number/input-number.component';
import { InputTextComponent } from '@/shared/components/ui/input-text/input-text.component';
import { TextAreaComponent } from '@/shared/components/ui/text-area/text-area.component';
import { EstadoCategoria, TipoCategoria } from '@/shared/enums/categoria.enums';
import {
    EstadoProducto,
    TipoProducto,
    UnidadMedida,
} from '@/shared/enums/producto.enums';
import { ToastService } from '@/shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Checkbox } from 'primeng/checkbox';
import { Categoria } from '../../interfaces/categorias.interface';
import { CategoriasService } from '../../services/categorias.service';
import { ColorPickerComponent } from '@/shared/components/ui/color-picker/color-picker.component';
import { ButtonCancelComponent } from '@/shared/components/ui/button-cancel/button-cancel.component';

@Component({
    selector: 'app-categorias-add',
    template: `
        <div class="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ categoriaId ? 'Actualizar' : 'Crear Nueva' }} Categoría
            </h2>

            <form [formGroup]="form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <app-input-text
                        label="Código"
                        [formControlInput]="$any(form.get('codigo'))"
                    />
                    <app-input-text
                        label="Nombre"
                        [formControlInput]="$any(form.get('nombre'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <app-input-number
                        label="Orden"
                        [formControlInput]="$any(form.get('orden'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <app-color-picker
                        label="Color"
                        [formControlInput]="$any(form.get('color'))"
                        placeholder="Ej: #FF5733"
                    />
                </div>

                <div>
                    <app-text-area
                        label="Descripción"
                        [formControlInput]="$any(form.get('descripcion'))"
                    />
                </div>

                <div>
                    <app-text-area
                        label="Notas"
                        [formControlInput]="$any(form.get('notas'))"
                    />
                </div>

                <div class="pt-6 flex justify-end space-x-4">
                    <app-button-cancel (clicked)="onCancel()" />
                    <app-button
                        [severity]="'primary'"
                        [raised]="true"
                        label="{{
                            categoriaId ? 'Actualizar' : 'Crear'
                        }}  Categoría"
                        icon="pi pi-check"
                        (click)="onSave()"
                    ></app-button>
                </div>
            </form>
        </div>
    `,
    styles: [],
    imports: [
        ButtonComponent,
        TextAreaComponent,
        InputTextComponent,
        Checkbox,
        DropdownComponent,
        InputNumberComponent,
        ReactiveFormsModule,
        ColorPickerComponent,
        ButtonCancelComponent,
    ],
})
export class CategoriasAddComponent implements OnInit {
    form: FormGroup;
    categoriaId: number | null = null;

    tipos = Object.values(TipoCategoria);
    estados = Object.values(EstadoCategoria);
    unidades = Object.values(UnidadMedida);

    // Estos datos se obtendrían de tu API
    categorias: Categoria[] = [];

    constructor(
        private fb: FormBuilder,
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
            estado: [EstadoCategoria.ACTIVA, Validators.required],
            color: [null, Validators.required],
            orden: [0, Validators.required],
            notas: [null],
            // isActive: [true, Validators.required],
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.categoriaId = id ? +id : null;
        this.getData();
    }

    onCancel() {
        this.confirmationService.confirm({
            message:
                '¿Está seguro de cancelar? Se perderán los cambios no guardados.',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.router.navigate(['/categorias']);
            },
        });
    }

    getData() {
        if (!this.categoriaId) {
            return;
        }
        this.categoriasService.getById(this.categoriaId).subscribe({
            next: (res) => {
                console.log(res);
                this.form.patchValue(res);
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
        if (!this.categoriaId) {
            this.toastService.error('delete', 'No hay categoría para eliminar');
            return;
        }

        this.confirmationService.confirm({
            message: '¿Está seguro de eliminar esta categoría?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (!this.categoriaId) {
                    return;
                }
                this.categoriasService.delete(this.categoriaId).subscribe({
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

        if (this.categoriaId) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        const value = this.form.value;
        this.categoriasService.create(value).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.createSuccess();
                this.router.navigate(['/categorias']);
            },
            error: (err) => {
                console.error(err);
                this.toastService.createError(err.error?.message || undefined);
            },
        });
    }

    update() {
        const value = this.form.value;
        if (!this.categoriaId) {
            return;
        }
        this.categoriasService.update(this.categoriaId, value).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.updateSuccess();
                this.router.navigate(['/categorias']);
            },
            error: (err) => {
                console.error(err);
                this.toastService.updateError(err.error?.message || undefined);
            },
        });
    }
}
