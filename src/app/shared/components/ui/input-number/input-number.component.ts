import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { InputErrorsComponent } from '../input-errors/input-errors.component';

@Component({
    selector: 'app-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        InputNumberModule,
        ReactiveFormsModule,
        InputErrorsComponent,
    ],
})
export class InputNumberComponent implements OnInit {
    @Input() formControlInput!: FormControl;
    @Input() label = '';
    @Input() inputId = '';
    @Input() placeholder = '';
    @Input() class = '';
    @Input() labelClass = '';
    @Input() incrementButtonIcon: InputNumber['incrementButtonIcon'] = '';
    @Input() decrementButtonIcon: InputNumber['decrementButtonIcon'] = '';
    @Input() required = false;
    @Input() showButtons = true;
    @Input() buttonLayout: InputNumber['buttonLayout'] = 'stacked';
    @Input() value!: string | number;
    @Input() max!: number;
    @Input() min!: number;
    @Input() maxLength!: number;
    @Input() minLength!: number;
    @Input() textColor: 'white' | '' = '';
    @Input() showError = true;
    @Input() mode!: InputNumber['mode'];
    @Input() maxFractionDigits!: InputNumber['maxFractionDigits'];
    @Input() minFractionDigits!: InputNumber['minFractionDigits'];
    visible = true;

    requiredValidator = Validators.required;

    // constructor() {}

    ngOnInit() {
        if (this.value) {
            this.formControlInput.setValue(this.value);
        }
    }
}
