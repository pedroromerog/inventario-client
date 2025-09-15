import { Roles } from '@/shared/enums/roles.enum';
import { MenuItem } from 'primeng/api';

export const menu: { [x: string]: MenuItem[] } = {
    [Roles.ADMIN]: [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/' }] },
        {
            label: 'Configuración',
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                    label: 'Usuarios',
                    icon: 'pi pi-fw pi-users',
                    routerLink: '/usuarios'
                },
                {
                    label: 'Productos',
                    icon: 'pi pi-fw pi-box',
                    routerLink: '/productos'
                },
                {
                    label: 'Categorías',
                    icon: 'pi pi-fw pi-tags',
                    routerLink: '/categorias'
                },
                {
                    label: 'Proveedores',
                    icon: 'pi pi-fw pi-shopping-cart',
                    routerLink: '/ventas'
                }
            ]
        },

        {
            label: 'Reportes',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: '/reportes'
        }
    ],
    [Roles.EMPLEADO]: [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/' },
        {
            label: 'Productos',
            icon: 'pi pi-fw pi-box',
            routerLink: '/productos'
        },
        {
            label: 'Categorías',
            icon: 'pi pi-fw pi-tags',
            routerLink: '/categorias'
        },
        {
            label: 'Ventas',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: '/ventas'
        }
    ]
};
