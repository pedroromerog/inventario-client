import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputErrorsComponent } from '../input-errors/input-errors.component';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        SelectModule,
        ReactiveFormsModule,
        InputErrorsComponent,
        SelectModule,
    ],
})
export class DropdownComponent implements OnInit, OnChanges {
    transformedOptions: any[] = [];
    @Output() selectionChange = new EventEmitter<any>();

    @Input() options: any[] = [];
    @Input() formControlInput!: FormControl;
    @Input() label = '';
    @Input() class = '';
    @Input() styleClass = '';
    @Input() required = false;
    @Input() fluid = false;
    @Input() showClear = false;
    @Input() lazy = false;
    @Input() editable = false;
    @Input() optionLabel = 'nombre';
    @Input() optionValue = 'id';
    @Input() placeholder = 'Selecciona una opción';
    @Input() filter = false;
    @Input() labelClass = '';
    @Input() readonly = true;
    @Input() showError = true;
    @Input() filterBy = 'nombre';

    @Output() valueChange = new EventEmitter<any>();
    constructor() {}

    requiredValidator = Validators.required;
    ngOnInit() {
        this.transformOptions();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['options']) {
            this.transformOptions();
        }
    }

    transformOptions() {
        this.transformedOptions = this.options?.map((option) => {
            if (typeof option === 'string') {
                return {
                    [this.optionLabel]: option,
                    [this.optionValue]: option,
                };
            } else {
                return option;
            }
        });
    }

    onSelectionChange(event: any) {
        this.selectionChange.emit(event.value);
        const selectedOption = this.transformedOptions.find(
            (option) => option[this.optionValue] === event.value,
        );
        this.formControlInput.setValue(selectedOption[this.optionValue]);
    }
}
