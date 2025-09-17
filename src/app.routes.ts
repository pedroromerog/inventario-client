import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            {
                path: 'proveedores',
                loadChildren: () =>
                    import('./app/pages/proveedores/proveedores.routes'),
            },
            {
                path: 'productos',
                loadChildren: () =>
                    import('./app/pages/productos/productos.routes'),
            },
            {
                path: 'categorias',
                loadChildren: () =>
                    import('./app/pages/categorias/categorias.routes'),
            },
            {
                path: 'movimientos',
                loadChildren: () =>
                    import(
                        './app/pages/movimientos-inventario/movimientos.routes'
                    ),
            },
        ],
    },
    {
        path: 'auth',
        loadChildren: () => import('./app/pages/auth/auth.routes'),
    },
];
