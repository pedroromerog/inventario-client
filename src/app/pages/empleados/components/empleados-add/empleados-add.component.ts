import { ButtonCancelComponent } from '@/shared/components/ui/button-cancel/button-cancel.component';
import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { CheckboxComponent } from '@/shared/components/ui/checkbox/checkbox.component';
import { DropdownComponent } from '@/shared/components/ui/dropdown/dropdown.component';
import { InputCalendarComponent } from '@/shared/components/ui/input-calendar/input-calendar.component';
import { InputTextComponent } from '@/shared/components/ui/input-text/input-text.component';
import { TextAreaComponent } from '@/shared/components/ui/text-area/text-area.component';
import { EstadoEmpleado, TipoEmpleado } from '@/shared/enums/empleado.enums';
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
import { EmpleadosService } from '../../services/empleados.service';

@Component({
    selector: 'app-empleados-add',
    template: `
        <div class="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ empleadoId ? 'Actualizar ' : 'Crear Nuevo' }} Empleado
            </h2>

            <form [formGroup]="form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-input-text
                        label="Código"
                        [formControlInput]="$any(form.get('codigo'))"
                    />
                    <app-input-text
                        label="Nombres"
                        [formControlInput]="$any(form.get('nombres'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-input-text
                        label="Apellidos"
                        [formControlInput]="$any(form.get('apellidos'))"
                    />
                    <app-input-text
                        label="Email"
                        [formControlInput]="$any(form.get('email'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <app-input-text
                        label="Teléfono"
                        [formControlInput]="$any(form.get('telefono'))"
                    />
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
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-input-text
                        label="Cargo"
                        [formControlInput]="$any(form.get('cargo'))"
                    />
                    <app-input-calendar
                        label="Fecha de Contratación"
                        [formControlInput]="$any(form.get('fechaContratacion'))"
                    />
                </div>

                <app-text-area
                    label="Observaciones"
                    [rows]="3"
                    [formControlInput]="$any(form.get('observaciones'))"
                />

                <!-- <div class="flex items-center space-x-2">
                    <app-checkbox
                        label="¿Está activo?"
                        [formControlInput]="$any(form.get('isActive'))"
                    />
                </div> -->

                <div class="pt-6 flex justify-end space-x-4">
                    <app-button-cancel (clicked)="onCancel()" />
                    <app-button
                        label="{{
                            empleadoId ? 'Actualizar ' : 'Crear'
                        }} Empleado"
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
        InputCalendarComponent,
        TextAreaComponent,
        CheckboxComponent,
        ButtonComponent,
        ButtonCancelComponent,
        CheckboxModule,
    ],
    providers: [ToastService],
})
export class EmpleadosAddComponent implements OnInit {
    form: FormGroup;
    empleadoId: number | null = null;

    tipos = Object.values(TipoEmpleado);
    estados = Object.values(EstadoEmpleado);

    constructor(
        private fb: FormBuilder,
        private empleadosService: EmpleadosService,
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
    ) {
        this.form = this.fb.group({
            codigo: ['', Validators.required],
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            telefono: [null],
            tipo: [null, Validators.required],
            estado: [EstadoEmpleado.ACTIVO, Validators.required],
            cargo: [null],
            fechaContratacion: [new Date(), Validators.required],
            observaciones: [''],
            // isActive: [true],
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.empleadoId = id ? +id : null;
        this.getData();
    }

    getData() {
        if (!this.empleadoId) {
            return;
        }
        this.empleadosService.getById(this.empleadoId).subscribe({
            next: (res) => {
                this.form.patchValue(res);
            },
            error: (err) => {
                console.error(err);
                this.toastService.error(
                    'list',
                    err.error?.message || 'Error al cargar el empleado',
                );
                this.router.navigate(['/empleados']);
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
                this.router.navigate(['/empleados']);
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

        if (this.empleadoId) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        const value = this.form.value;
        this.empleadosService.create(value).subscribe({
            next: () => {
                this.toastService.createSuccess();
                this.router.navigate(['/empleados']);
            },
            error: (err) => {
                console.error(err);
                this.toastService.createError(err.error?.message || undefined);
            },
        });
    }

    update() {
        const value = this.form.value;
        if (!this.empleadoId) {
            return;
        }
        this.empleadosService.update(this.empleadoId, value).subscribe({
            next: () => {
                this.toastService.updateSuccess();
                this.router.navigate(['/empleados']);
            },
            error: (err) => {
                console.error(err);
                this.toastService.updateError(err.error?.message || undefined);
            },
        });
    }
}
