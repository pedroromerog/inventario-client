import { ProveedoresService } from '@/pages/proveedores/services/proveedores.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-producto-add',
    template: ` <p>producto-add Works!</p> `,
    styles: [],
    imports: [CommonModule, ReactiveFormsModule]
})
export class ProductoAddComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    constructor(
        private fb: FormBuilder,
        private proveedoresService: ProveedoresService
    ) {}

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            codigo: ['', [Validators.required]],
            nombre: ['', [Validators.required]],
            descripcion: ['', []],
            tipo: ['', [Validators.required]],
            estado: ['', [Validators.required]],
            unidadMedida: ['', [Validators.required]],
            categoriaId: ['', []],
            proveedorId: ['', []],
            precioCompra: ['', []],
            precioVenta: ['', []],
            precioPromedio: ['', []],
            stockMinimo: ['', [Validators.required]],
            stockMaximo: ['', [Validators.required]],
            marca: ['', [Validators.required]],
            modelo: ['', []],
            color: ['', []],
            dimensiones: ['', []],
            peso: ['', []],
            especificaciones: ['', []],
            instrucciones: ['', []],
            notas: ['', []],
            requiereRefrigeracion: ['', [Validators.required]],
            esFragil: ['', [Validators.required]],
            esPeligroso: ['', [Validators.required]],
            diasVidaUtil: ['', [Validators.required]],
            imagenUrl: ['', []],
            is_active: ['', [Validators.required]]
        });
    }
}
