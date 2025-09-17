import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { InputErrorsComponent } from '../input-errors/input-errors.component';

@Component({
    selector: 'app-checkbox',
    template: `
        <div class="flex flex-col {{ class }}">
            <div class="flex gap-1">
                <p-checkbox
                    [name]="name"
                    [value]="value"
                    [size]="size"
                    [id]="inputId"
                    [disabled]="disabled"
                    [binary]="binary"
                    [invalid]="
                        formControlInput.invalid &&
                        (formControlInput.dirty || formControlInput.touched)
                    "
                    [formControl]="formControlInput"
                    [readonly]="readonly"
                />
                <label
                    *ngIf="label"
                    [ngStyle]="{ color: textColor }"
                    [for]="inputId"
                    class="{{ labelClass }} text-sm font-medium mb-1"
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
            </div>

            <div
                *ngIf="
                    formControlInput.invalid &&
                    (formControlInput.dirty || formControlInput.touched) &&
                    showError
                "
                class="max-h-4"
            >
                <app-input-errors
                    [formControlInput]="formControlInput"
                ></app-input-errors>
            </div>
        </div>
    `,
    styles: [],
    imports: [
        Checkbox,
        CommonModule,
        ReactiveFormsModule,
        InputErrorsComponent,
    ],
})
export class CheckboxComponent implements OnInit {
    @Input() formControlInput!: FormControl;
    @Input() label = '';
    @Input() name!: string;
    @Input() inputId = '';
    @Input() placeholder = '';
    @Input() class = '';
    @Input() labelClass = '';
    @Input() required = false;
    @Input() value!: string | number;
    @Input() showError = true;
    @Input() readonly = false;
    @Input() disabled = false;
    @Input() size!: 'small' | 'large';
    @Input() binary: Checkbox['binary'] = true;
    @Input() textColor: 'white' | '' = '';

    requiredValidator = Validators.required;

    constructor() {}

    ngOnInit() {}
}
