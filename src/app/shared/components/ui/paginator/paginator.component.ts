import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
    selector: 'app-paginator',
    template: `
        <p-paginator
            (onPageChange)="onChange($event)"
            [first]="currentPage"
            [rows]="rows"
            [totalRecords]="totalCount"
            [rowsPerPageOptions]="[
                rows || 10,
                (rows || 10) * 2,
                (rows || 10) * 3,
            ]"
        />
    `,
    styles: [],
    standalone: true,
    imports: [CommonModule, PaginatorModule],
})
export class PaginatorComponent implements OnInit {
    @Input() totalCount = 0;
    @Input() currentPage: number = 1;
    @Input() rows: number = 10;
    @Input() pageLimit: number | undefined | null = 10;
    @Input() loading = false;

    @Output() onPageChange = new EventEmitter<PaginatorState>();

    constructor() {}

    onChange($event: PaginatorState) {
        this.onPageChange.emit($event);
        this.currentPage = $event.page ?? 0;
        this.pageLimit = $event.rows;
    }

    ngOnInit() {}
}
