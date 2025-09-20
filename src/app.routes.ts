import { authGuard } from '@/config/auth.guard';
import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
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
                path: 'stock',
                loadChildren: () => import('./app/pages/stock/stock.routes'),
            },
            {
                path: 'empleados',
                loadChildren: () =>
                    import('./app/pages/empleados/empleados.routes'),
            },
            {
                path: 'usuarios',
                loadChildren: () =>
                    import('./app/pages/usuarios/usuarios.routes'),
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
