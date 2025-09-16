import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
    standalone: true,
    imports: [CommonModule, ButtonModule, TooltipModule],
})
export class ButtonComponent implements OnInit {
    @Input() iconPosition: 'left' | 'right' = 'left';
    @Input() dataKey?: string;
    @Input() disabled = false;
    @Input() width = '165px';
    @Input() showIcon = false;
    @Input() loading = false;
    @Input() fluid = false;
    @Input() styleClass = '';
    @Input() size: Button['size'] = undefined;
    @Input() label = '';
    @Input() tooltipPosition = 'right';
    @Input() icon = '';
    @Input() text = false;
    @Input() severity: Button['severity'] = null;
    @Input() tooltip = '';
    @Input() rounded = false;
    @Input() raised = false;
    @Input() outlined = false;

    @Output() clicked: EventEmitter<Event> = new EventEmitter<Event>();
    constructor() {}

    ngOnInit() {}

    onClick($event: any) {
        this.clicked.emit($event);
    }
}
