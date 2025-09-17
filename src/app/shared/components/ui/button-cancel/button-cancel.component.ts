import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-button-cancel',
    template: `
        <app-button
            [severity]="'secondary'"
            [raised]="true"
            label="Cancelar"
            (click)="clicked.emit()"
        ></app-button>
    `,
    styles: [],
    imports: [ButtonComponent],
})
export class ButtonCancelComponent implements OnInit {
    @Output() clicked = new EventEmitter<void>();
    constructor() {}

    ngOnInit() {}
}
