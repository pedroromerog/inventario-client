import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-button-view',
    template: `
        <app-button
            [text]="true"
            [rounded]="true"
            severity="info"
            icon="pi pi-eye"
            pTooltip="Ver detalles"
            (clicked)="clicked.emit()"
        ></app-button>
    `,
    styles: [],
    imports: [ButtonComponent],
})
export class ButtonViewComponent implements OnInit {
    @Output() clicked = new EventEmitter<void>();
    constructor() {}

    ngOnInit() {}
}
