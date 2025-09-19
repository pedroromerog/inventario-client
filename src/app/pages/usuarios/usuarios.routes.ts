import { UsuariosAddComponent } from './components/usuarios-add/usuarios-add.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';

export default [
    {
        path: '',
        component: UsuariosListComponent,
    },
    {
        path: 'add',
        component: UsuariosAddComponent,
    },
    {
        path: 'edit/:id',
        component: UsuariosAddComponent,
    },
];
