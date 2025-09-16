import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
    selector: 'app-skeleton-list-item',
    template: `<p-skeleton height="6rem" styleClass="mb-2" /> `,
    styles: [],
    imports: [CommonModule, SkeletonModule],
})
export class SkeletonListItemComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
