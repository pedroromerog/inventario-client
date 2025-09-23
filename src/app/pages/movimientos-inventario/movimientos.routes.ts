import { MovimientosAddComponent } from './components/movimientos-add/movimientos-add.component';
import { MovimientosEditComponent } from './components/movimientos-edit/movimientos-edit.component';
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
    {
        path: 'edit/:id',
        component: MovimientosEditComponent,
    },
];
