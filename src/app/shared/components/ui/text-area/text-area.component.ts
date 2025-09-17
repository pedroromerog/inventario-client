import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { InputErrorsComponent } from '../input-errors/input-errors.component';
@Component({
    selector: 'app-text-area',
    templateUrl: './text-area.component.html',
    standalone: true,
    imports: [
        CommonModule,
        InputErrorsComponent,
        TextareaModule,
        ReactiveFormsModule,
    ],
})
export class TextAreaComponent implements OnInit {
    @Input() formControlInput!: FormControl;
    @Input() label = '';
    @Input() inputId = '';
    @Input() placeholder = '';
    @Input() class = '';
    @Input() labelClass = '';
    @Input() required = false;
    @Input() value!: string | number;
    @Input() max!: number;
    @Input() min!: number;
    @Input() rows = 5;
    @Input() maxLength!: number;
    @Input() minLength!: number;
    @Input() textColor: 'black' | '' = '';
    @Input() showError = true;
    @Input() readonly = false;
    @Input() uppercase = false;
    @Input() disabled = false;
    visible = true;
    changetype = false;

    requiredValidator = Validators.required;

    constructor() {}

    ngOnInit() {
        if (this.value) {
            this.formControlInput.setValue(this.value);
        }
    }

    onInput(event: Event): void {
        if (this.uppercase) {
            const input = event.target as HTMLInputElement;
            input.value = input.value.toUpperCase();
            this.formControlInput.setValue(input.value);
        }
    }
}
