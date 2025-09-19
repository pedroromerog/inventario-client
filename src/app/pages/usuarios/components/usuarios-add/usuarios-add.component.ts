import { ButtonCancelComponent } from '@/shared/components/ui/button-cancel/button-cancel.component';
import { ButtonComponent } from '@/shared/components/ui/button/button.component';
import { CheckboxComponent } from '@/shared/components/ui/checkbox/checkbox.component';
import { DropdownComponent } from '@/shared/components/ui/dropdown/dropdown.component';
import { InputCalendarComponent } from '@/shared/components/ui/input-calendar/input-calendar.component';
import { InputPasswordomponent } from '@/shared/components/ui/input-password/input-password.component';
import { InputTextComponent } from '@/shared/components/ui/input-text/input-text.component';
import { TextAreaComponent } from '@/shared/components/ui/text-area/text-area.component';
import { EstadoUsuario } from '@/shared/enums/user.enums';
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
import { Rol } from '../../interfaces/rol.interface';
import { RolesService } from '../../services/roles.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
    selector: 'app-usuarios-add',
    template: `
        <div class="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ usuarioId ? 'Actualizar' : 'Crear Nuevo' }} Usuario
            </h2>

            <form [formGroup]="form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-input-text
                        label="Usuario"
                        [formControlInput]="$any(form.get('username'))"
                    />
                    <app-input-text
                        label="Nombre"
                        [formControlInput]="$any(form.get('nombre'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-input-text
                        label="Apellido"
                        [formControlInput]="$any(form.get('apellido'))"
                    />
                    <app-input-text
                        label="Email"
                        [formControlInput]="$any(form.get('email'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-dropdown
                        label="Rol"
                        [formControlInput]="$any(form.get('rolId'))"
                        [options]="roles"
                        [filter]="true"
                        optionLabel="nombre"
                        optionValue="id"
                    />
                    <app-dropdown
                        label="Estado"
                        [formControlInput]="$any(form.get('estado'))"
                        [options]="estados"
                    />
                </div>

                <div
                    *ngIf="!usuarioId"
                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <app-input-password
                        label="Contraseña"
                        [formControlInput]="$any(form.get('password'))"
                    />
                    <div class="flex items-center">
                        <app-checkbox
                            label="Requiere cambio de contraseña"
                            [formControlInput]="
                                $any(form.get('requiereCambioPassword'))
                            "
                        />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-input-text
                        label="Teléfono"
                        [formControlInput]="$any(form.get('telefono'))"
                    />
                    <app-input-text
                        label="Departamento"
                        [formControlInput]="$any(form.get('departamento'))"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <app-input-text
                        label="Cargo"
                        [formControlInput]="$any(form.get('cargo'))"
                    />
                    @if (usuarioId) {
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >último Acceso</label
                            >
                            <p
                                class="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                            >
                                {{
                                    form.get('ultimoAcceso')?.value
                                        | date: 'medium'
                                }}
                            </p>
                        </div>
                    }
                </div>

                <app-text-area
                    label="Notas"
                    [rows]="3"
                    [formControlInput]="$any(form.get('notas'))"
                />

                <div class="pt-6 flex justify-end space-x-4">
                    <app-button-cancel (clicked)="onCancel()" />
                    <app-button
                        label="{{ usuarioId ? 'Actualizar' : 'Crear' }} Usuario"
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
        CheckboxComponent,
        TextAreaComponent,
        InputCalendarComponent,
        ButtonComponent,
        ButtonCancelComponent,
        InputPasswordomponent,
    ],
    standalone: true,
    providers: [ToastService],
})
export class UsuariosAddComponent implements OnInit {
    form: FormGroup;
    usuarioId: string | null = null;
    roles: Rol[] = [];
    estados = Object.values(EstadoUsuario);

    constructor(
        private fb: FormBuilder,
        private usuariosService: UsuariosService,
        private rolesService: RolesService,
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
    ) {
        this.form = this.fb.group({
            username: ['', Validators.required],
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: [''],
            estado: [EstadoUsuario.ACTIVO, Validators.required],
            rolId: [null, Validators.required],
            telefono: [''],
            departamento: [''],
            cargo: [''],
            notas: [''],
            ultimoAcceso: [null],
            requiereCambioPassword: [true],
            isActive: [true],
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.usuarioId = id;
        this.loadRoles();

        if (this.usuarioId) {
            this.form.get('password')?.setValidators(null);
            this.loadUserData();
        } else {
            this.form.get('password')?.setValidators(Validators.required);
        }
    }

    loadRoles() {
        this.rolesService.getAll().subscribe({
            next: (res) => {
                const [roles, cant] = res;
                this.roles = roles;
            },
            error: (err) => {
                this.toastService.listError('Error al cargar los roles');
                console.error(err);
            },
        });
    }

    loadUserData() {
        if (!this.usuarioId) return;

        this.usuariosService.getById(this.usuarioId).subscribe({
            next: (res) => {
                this.form.patchValue({
                    ...res,
                    rolId: res.rol?.id, // Asigna el ID del rol al formulario
                });
            },
            error: (err) => {
                this.toastService.listError('Error al cargar el usuario');
                this.router.navigate(['/usuarios']);
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
                this.router.navigate(['/usuarios']);
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

        if (this.usuarioId) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        this.usuariosService.create(this.form.value).subscribe({
            next: () => {
                this.toastService.createSuccess();
                this.router.navigate(['/usuarios']);
            },
            error: (err) => {
                this.toastService.createError(err.error?.message || undefined);
                console.error(err);
            },
        });
    }

    update() {
        if (!this.usuarioId) return;
        const value = this.form.value;
        delete value.password; // Elimina el campo password si está vacío
        delete value.requiereCambioPassword; // Elimina el campo requiereCambioPassword si está vacío
        delete value.isActive; // Elimina el campo isActive si está vacío
        delete value.ultimoAcceso; // Elimina el campo ultimoAcceso si está vacío

        this.usuariosService.update(this.usuarioId, this.form.value).subscribe({
            next: () => {
                this.toastService.updateSuccess();
                this.router.navigate(['/usuarios']);
            },
            error: (err) => {
                this.toastService.updateError(err.error?.message || undefined);
                console.error(err);
            },
        });
    }
}
