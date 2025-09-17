import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-button-delete',
    template: `
        <app-button
            [text]="true"
            [rounded]="true"
            severity="danger"
            icon="pi pi-trash"
            pTooltip="Eliminar"
            (clicked)="clicked.emit()"
        ></app-button>
    `,
    styles: [],
    imports: [ButtonComponent],
})
export class ButtonDeleteComponent implements OnInit {
    @Output() clicked = new EventEmitter<void>();
    constructor() {}

    ngOnInit() {}
}
