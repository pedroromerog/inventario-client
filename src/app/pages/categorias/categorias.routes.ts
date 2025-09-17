import { CategoriasAddComponent } from './components/categorias-add/categorias-add.component';
import { CategoriasListComponent } from './components/categorias-list/categorias-list.component';

export default [
    {
        path: '',
        component: CategoriasListComponent,
    },
    {
        path: 'add',
        component: CategoriasAddComponent,
    },
    {
        path: 'edit/:id',
        component: CategoriasAddComponent,
    },
];
