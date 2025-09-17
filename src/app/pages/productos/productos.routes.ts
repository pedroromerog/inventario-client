import { ProductoAddComponent } from './components/producto-add/producto-add.component';
import { ProductosListComponent } from './components/productos-list/productos-list.component';

export default [
    {
        path: '',
        component: ProductosListComponent,
    },
    {
        path: 'add',
        component: ProductoAddComponent,
    },
    {
        path: 'edit/:id',
        component: ProductoAddComponent,
    },
];
