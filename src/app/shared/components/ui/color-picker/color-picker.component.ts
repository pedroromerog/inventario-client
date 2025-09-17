import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputErrorsComponent } from '../input-errors/input-errors.component';
@Component({
    selector: 'app-color-picker',
    template: `
        <div class="flex flex-col {{ class }}">
            <label
                class="{{ labelClass }} mb-1 text-sm font-medium"
                *ngIf="label"
            >
                {{ label
                }}<em
                    *ngIf="
                        required ||
                        formControlInput.hasValidator(requiredValidator)
                    "
                    >*</em
                >
            </label>

            <p-colorpicker
                [id]="inputId"
                class="h-10"
                defaultColor="989898"
                [required]="required"
                [invalid]="
                    formControlInput.invalid &&
                    (formControlInput.dirty || formControlInput.touched)
                "
                [formControl]="formControlInput"
            />

            <div
                *ngIf="
                    formControlInput.invalid &&
                    (formControlInput.dirty || formControlInput.touched) &&
                    showError
                "
                class="min-h-4"
            >
                <app-input-errors
                    [formControlInput]="formControlInput"
                ></app-input-errors>
            </div>
        </div>
    `,
    styles: [],
    imports: [
        ColorPickerModule,
        ReactiveFormsModule,
        CommonModule,
        InputErrorsComponent,
    ],
})
export class ColorPickerComponent implements OnInit {
    @Input() formControlInput!: FormControl;
    @Input() label = '';
    @Input() inputId = '';
    @Input() class = '';
    @Input() labelClass = '';
    @Input() required = false;
    @Input() showError = true;
    @Input() readonly = false;
    @Input() disabled = false;
    visible = true;
    changetype = false;

    requiredValidator = Validators.required;

    constructor() {}

    ngOnInit() {}
}
