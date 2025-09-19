import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { DropdownComponent } from '@/shared/components/ui/dropdown/dropdown.component';
import { HeaderTitleComponent } from '@/shared/components/ui/header-title/header-title.component';
import { InputTextComponent } from '@/shared/components/ui/input-text/input-text.component';
import { SelectButtonComponent } from '@/shared/components/ui/select-button/select-button.component';
import {
    EstadosProveedor,
    TiposProveedor,
} from '@/shared/enums/proveedor.enums';
import { ToastService } from '@/shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Proveedor } from '../../interfaces/proveedor.interface';
import { ProveedoresService } from '../../services/proveedores.service';
import { TextAreaComponent } from '@/shared/components/ui/text-area/text-area.component';
import { ButtonCancelComponent } from '@/shared/components/ui/button-cancel/button-cancel.component';

@Component({
    selector: 'app-proveedores-add',
    template: `
        <div class="max-w-4xl mx-auto ">
            <div class="flex justify-between">
                <app-header-title
                    title="{{
                        proveedorId ? 'Actualizar Proveedor' : 'Crear Proveedor'
                    }}"
                />
                @if (proveedorId) {
                    <app-button
                        label="Eliminar"
                        icon="pi pi-trash"
                        class="p-button-outlined"
                        [severity]="'danger'"
                        (clicked)="onDelete()"
                    />
                }
            </div>
            <div class="card">
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                    <app-input-text
                        label="Código"
                        [formControlInput]="$any(form.get('codigo'))"
                    />
                    <app-input-text
                        label="Nombre"
                        [formControlInput]="$any(form.get('nombre'))"
                    />
                    <app-dropdown
                        optionLabel="label"
                        optionValue="value"
                        label="Tipo"
                        [options]="tipoProveedor"
                        [formControlInput]="$any(form.get('tipo'))"
                    />
                    <app-text-area
                        class="col-span-1 sm:col-span-2 md:col-span-3"
                        label="Descripcion"
                        [rows]="3"
                        [formControlInput]="$any(form.get('descripcion'))"
                    />

                    <app-dropdown
                        optionLabel="label"
                        optionValue="value"
                        label="Estado"
                        [options]="estadosProveedor"
                        [formControlInput]="$any(form.get('estado'))"
                    />
                    <app-input-text
                        label="Nit"
                        [formControlInput]="$any(form.get('nit'))"
                    />
                    <app-input-text
                        label="Razón Social"
                        [formControlInput]="$any(form.get('razonSocial'))"
                    />
                    <app-input-text
                        label="Dirección"
                        [formControlInput]="$any(form.get('direccion'))"
                    />
                    <app-input-text
                        label="Ciudad"
                        [formControlInput]="$any(form.get('ciudad'))"
                    />
                    <app-input-text
                        label="Departamento"
                        [formControlInput]="$any(form.get('departamento'))"
                    />
                    <app-input-text
                        label="Teléfono"
                        [formControlInput]="$any(form.get('telefono'))"
                    />
                    <app-input-text
                        label="Email"
                        [formControlInput]="$any(form.get('email'))"
                    />
                    <app-input-text
                        label="Sitio Web"
                        [formControlInput]="$any(form.get('sitioWeb'))"
                    />
                    <app-input-text
                        label="Contacto Principal"
                        [formControlInput]="$any(form.get('contactoPrincipal'))"
                    />
                    <app-input-text
                        label="Teléfono de Contacto"
                        [formControlInput]="$any(form.get('telefonoContacto'))"
                    />
                    <app-input-text
                        label="Email de Contacto"
                        [formControlInput]="$any(form.get('emailContacto'))"
                    />
                    <app-text-area
                        class="col-span-1 sm:col-span-2 md:col-span-3"
                        label="Notas"
                        [rows]="3"
                        [formControlInput]="$any(form.get('notas'))"
                    />
                    <app-select-button
                        label="Activo"
                        [allowEmpty]="false"
                        optionLabel="label"
                        optionValue="value"
                        [options]="stateOptions"
                        [formControlInput]="$any(form.get('is_active'))"
                    />
                </div>
            </div>
            <div class="mt-4 flex justify-end gap-4">
                <app-button-cancel (clicked)="onCancel()" />
                <app-button
                    label="{{ proveedorId ? 'Actualizar' : 'Crear' }} Proveedor"
                    icon="pi pi-check            
            "
                    (clicked)="onSave()"
                />
            </div>
            <!-- form value: {{ form.value | json }} -->
        </div>
    `,
    styles: [],
    imports: [
        CommonModule,
        ButtonComponent,
        InputTextComponent,
        ReactiveFormsModule,
        HeaderTitleComponent,
        DropdownComponent,
        SelectButtonComponent,
        RouterModule,
        TextAreaComponent,
        ButtonCancelComponent,
    ],
    providers: [ToastService],
})
export class ProveedoresAddComponent implements OnInit {
    proveedorId: Proveedor['id'] | null = null;
    form: FormGroup = new FormGroup({});
    tipoProveedor = TiposProveedor;
    estadosProveedor = EstadosProveedor;
    stateOptions: any[] = [
        { label: 'Activo', value: true },
        { label: 'Inactivo', value: false },
    ];
    constructor(
        private fb: FormBuilder,
        private proveedoresService: ProveedoresService,
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit() {
        this.buildForm();
        const id = this.route.snapshot.paramMap.get('id');
        this.proveedorId = id ? +id : null;
        this.getData();
    }

    onCancel() {
        this.confirmationService.confirm({
            message:
                '¿Está seguro de cancelar? Se perderán los cambios no guardados.',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.router.navigate(['/proveedores']);
            },
        });
    }

    getData() {
        if (!this.proveedorId) {
            return;
        }
        this.proveedoresService.getById(this.proveedorId).subscribe({
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
        if (!this.proveedorId) {
            this.toastService.error('delete', 'No hay proveedor para eliminar');
            return;
        }

        this.confirmationService.confirm({
            message: '¿Está seguro de eliminar este proveedor?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (!this.proveedorId) {
                    return;
                }
                this.proveedoresService.delete(this.proveedorId).subscribe({
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

        if (this.proveedorId) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        const value = this.form.value;
        this.proveedoresService.create(value).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.createSuccess();
                this.router.navigate(['/proveedores']);
            },
            error: (err) => {
                console.error(err);
                this.toastService.createError(err.error?.message || undefined);
            },
        });
    }

    update() {
        const value = this.form.value;
        if (!this.proveedorId) {
            return;
        }
        this.proveedoresService.update(this.proveedorId, value).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.updateSuccess();
                this.router.navigate(['/proveedores']);
            },
            error: (err) => {
                console.error(err);
                this.toastService.updateError(err.error?.message || undefined);
            },
        });
    }

    buildForm() {
        this.form = this.fb.group({
            codigo: ['', [Validators.required]],
            nombre: ['', [Validators.required]],
            descripcion: ['', []],
            tipo: ['', [Validators.required]],
            estado: ['', [Validators.required]],
            nit: ['', [Validators.required]],
            razonSocial: [null, []],
            direccion: [null, []],
            ciudad: [null, []],
            departamento: [null, []],
            telefono: [null, []],
            email: [null, []],
            sitioWeb: [null, []],
            contactoPrincipal: [null, []],
            telefonoContacto: [null, []],
            emailContacto: [null, []],
            notas: [null, []],
            is_active: [true, [Validators.required]],
        });
    }
}
