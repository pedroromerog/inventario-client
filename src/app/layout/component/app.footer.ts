import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary font-bold hover:underline"
            >RENOVA</a
        >
        2025 - Todos los derechos reservados.
    </div>`,
})
export class AppFooter {}
