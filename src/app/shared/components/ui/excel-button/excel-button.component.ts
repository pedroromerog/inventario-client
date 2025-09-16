import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-excel-button',
    template: `
        <p-button
            icon="pi pi-file-excel"
            [loading]="loading"
            [rounded]="false"
            [text]="false"
            [size]="'large'"
            tooltipPosition="left"
            pTooltip="Descargar Excel"
            (click)="onClick($event)"
        />
    `,
    styles: [],
    imports: [ButtonModule, TooltipModule],
})
export class ExcelButtonComponent implements OnInit {
    @Input() loading = false;
    @Output() clicked: EventEmitter<Event> = new EventEmitter<Event>();
    constructor() {}

    ngOnInit() {}

    onClick($event: any) {
        this.clicked.emit($event);
    }
}
