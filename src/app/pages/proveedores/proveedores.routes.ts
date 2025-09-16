import { ProveedoresAddComponent } from './components/proveedores-add/proveedores-add.component';
import { ProveedoresListComponent } from './components/proveedores-list/proveedores-list.component';

export default [
    {
        path: '',
        component: ProveedoresListComponent,
    },
    {
        path: 'add',
        component: ProveedoresAddComponent,
    },
    {
        path: 'edit/:id',
        component: ProveedoresAddComponent,
    },
];
