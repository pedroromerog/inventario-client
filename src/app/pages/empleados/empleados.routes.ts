import { EmpleadosAddComponent } from './components/empleados-add/empleados-add.component';
import { EmpleadosListComponent } from './components/empleados-list/empleados-list.component';

export default [
    {
        path: '',
        component: EmpleadosListComponent,
    },
    {
        path: 'add',
        component: EmpleadosAddComponent,
    },
    {
        path: 'edit/:id',
        component: EmpleadosAddComponent,
    },
];
