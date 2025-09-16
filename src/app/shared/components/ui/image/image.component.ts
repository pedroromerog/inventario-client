import { Component, Input, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-image',
    template: `
        <p-image
            src="{{ url }}"
            [preview]="true"
            alt="Image"
            class="{{ styleClass }}"
        >
            <!-- <ng-template #indicator>
                <i class="pi pi-search"></i>
            </ng-template> -->
            <ng-template #image class="{{ styleClass }}">
                <img src="{{ url }}" alt="image" class="{{ styleClass }}" />
            </ng-template>
            <!-- <ng-template
                #preview
                let-style="style"
                let-previewCallback="previewCallback"
            >
                <img
                    src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg"
                    alt="image"
                    [style]="style"
                    (click)="previewCallback()"
                />
            </ng-template> -->
        </p-image>
        <!-- width="{{ width }}" -->
    `,
    styles: [],
    imports: [ImageModule],
})
export class ImageComponent implements OnInit {
    @Input({ required: true }) url!: string;
    @Input() width!: string;
    @Input() styleClass = '';
    constructor() {}

    ngOnInit() {}
}
