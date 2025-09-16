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
                loadChildren: () => import('./app/pages/proveedores/proveedores.routes')
            }
        ]
    },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') }
];
