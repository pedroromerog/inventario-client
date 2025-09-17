import { MovimientosAddComponent } from './components/movimientos-add/movimientos-add.component';
import { MovimientosListComponent } from './components/movimientos-list/movimientos-list.component';

export default [
    {
        path: '',
        component: MovimientosListComponent,
    },
    {
        path: 'add',
        component: MovimientosAddComponent,
    },
    // {
    //     path: 'edit/:id',
    //     component: ProveedoresAddComponent,
    // },
];
