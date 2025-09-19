import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { InputErrorsComponent } from '../input-errors/input-errors.component';

@Component({
    selector: 'app-input-calendar',
    templateUrl: './input-calendar.component.html',
    styleUrls: ['./input-calendar.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputErrorsComponent,
        DatePickerModule,
    ],
})
export class InputCalendarComponent implements OnInit {
    @Input() formControlInput!: FormControl;
    @Input() label = '';
    @Input() inputId = '';
    @Input() class = '';
    @Input() readonlyInput = false;
    @Input() labelClass = '';
    @Input() value!: string | number | Date;
    @Input() placeholder = 'Seleccione una fecha';
    @Input() required = false;
    @Input() showClear = false;
    @Input() fluid = false;
    @Input() disable = false;
    @Input() selectionMode: DatePicker['selectionMode'] = 'single';
    @Input() textColor: 'white' | '' = '';
    @Input() dateFormat = 'dd/mm/yy'; // Default format
    @Input() showTime = false; // Enable time selection
    @Input() minDate!: Date; // Minimum selectable date
    @Input() maxDate!: Date; // Maximum selectable date
    @Input() showError = true;
    visible = true;
    changetype = false;
    requiredValidator = Validators.required;

    ngOnInit(): void {
        // Initialize default values if necessary
    }
}
