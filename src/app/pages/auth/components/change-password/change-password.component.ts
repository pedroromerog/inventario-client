import { InputPasswordomponent } from '@/shared/components/ui/input-password/input-password.component';
import { ToastService } from '@/shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth.service';
import { ChangePasswordDto } from '../../interfaces/change-password.interface';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
    selector: 'app-change-password',
    template: `
        <div class="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-md mx-auto">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                Cambiar Contraseña
            </h2>

            <form [formGroup]="form" class="space-y-6">
                <div>
                    <app-input-password
                        label="Contraseña Actual"
                        placeholder="Ingresa tu contraseña actual"
                        [formControlInput]="$any(form.get('currentPassword'))"
                        [required]="true"
                    />
                </div>

                <div>
                    <app-input-password
                        label="Nueva Contraseña"
                        placeholder="Ingresa tu nueva contraseña"
                        [formControlInput]="$any(form.get('newPassword'))"
                        [required]="true"
                    />
                    <div class="text-xs text-gray-500 mt-1">
                        La contraseña debe tener al menos 8 caracteres
                    </div>
                </div>

                <div>
                    <app-input-password
                        label="Confirmar Nueva Contraseña"
                        placeholder="Confirma tu nueva contraseña"
                        [formControlInput]="
                            $any(form.get('confirmNewPassword'))
                        "
                        [required]="true"
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
                        Cambiar Contraseña
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
        <p-toast key="main"></p-toast>
    `,
    styles: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputPasswordomponent,
        ButtonModule,
        ToastModule,
    ],
    providers: [ToastService, MessageService],
})
export class ChangePasswordComponent {
    @Output() passwordChanged = new EventEmitter<void>();
    @Output() cancelled = new EventEmitter<void>();

    form: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private toastService: ToastService,
        private router: Router,
    ) {
        this.form = this.fb.group(
            {
                currentPassword: ['', Validators.required],
                newPassword: [
                    '',
                    [Validators.required, Validators.minLength(4)],
                ],
                confirmNewPassword: ['', Validators.required],
            },
            { validators: this.passwordMatchValidator },
        );
    }

    private passwordMatchValidator(
        control: AbstractControl,
    ): ValidationErrors | null {
        const newPassword = control.get('newPassword');
        const confirmNewPassword = control.get('confirmNewPassword');

        if (newPassword && confirmNewPassword) {
            const match = newPassword.value === confirmNewPassword.value;
            if (!match) {
                confirmNewPassword.setErrors({ passwordMismatch: true });
                return { passwordMismatch: true };
            } else {
                // Limpiar errores si las contraseñas coinciden
                if (confirmNewPassword.errors?.['passwordMismatch']) {
                    delete confirmNewPassword.errors['passwordMismatch'];
                    if (Object.keys(confirmNewPassword.errors).length === 0) {
                        confirmNewPassword.setErrors(null);
                    }
                }
            }
        }

        return null;
    }

    onSubmit(): void {
        this.loading = true;
        if (this.form.valid) {
            const changePasswordData: ChangePasswordDto = {
                currentPassword: this.form.get('currentPassword')?.value,
                newPassword: this.form.get('newPassword')?.value,
                confirmNewPassword: this.form.get('confirmNewPassword')?.value,
            };

            this.authService.changePassword(changePasswordData).subscribe({
                next: (response) => {
                    this.toastService.updateSuccess(
                        'Contraseña actualizada correctamente',
                    );
                    this.form.reset();
                    this.passwordChanged.emit();
                    this.loading = false;
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    console.error('Error al cambiar contraseña', error);
                    this.toastService.updateError(
                        error.error?.message ||
                            'Error al cambiar la contraseña',
                    );
                    this.loading = false;
                },
            });
        } else {
            console.error('El formulario no es válido');
            this.form.markAllAsTouched();
            this.loading = false;
        }
    }

    onCancel(): void {
        this.form.reset();
        this.cancelled.emit();
        this.router.navigate(['/']);
    }

    // Helper para verificar si un campo es inválido y fue tocado
    isInvalid(controlName: string): boolean {
        const control = this.form.get(controlName);
        return (
            !!control && control.invalid && (control.dirty || control.touched)
        );
    }

    // Helper para obtener el mensaje de error específico
    getErrorMessage(controlName: string): string {
        const control = this.form.get(controlName);
        if (control && control.errors && control.touched) {
            if (control.errors['required']) {
                return 'Este campo es requerido';
            }
            if (control.errors['minlength']) {
                return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
            }
            if (control.errors['passwordMismatch']) {
                return 'Las contraseñas no coinciden';
            }
        }
        return '';
    }
}
