import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-button-edit',
    template: `
        <app-button
            [text]="true"
            [rounded]="true"
            severity="warn"
            icon="pi pi-pencil"
            pTooltip="Editar"
            (clicked)="clicked.emit()"
        ></app-button>
    `,
    styles: [],
    imports: [ButtonComponent],
})
export class ButtonEditComponent implements OnInit {
    @Output() clicked = new EventEmitter<void>();
    constructor() {}

    ngOnInit() {}
}
