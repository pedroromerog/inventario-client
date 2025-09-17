import { Roles } from '@/shared/enums/roles.enum';
import { MenuItem } from 'primeng/api';

export const menu: { [x: string]: MenuItem[] } = {
    [Roles.ADMIN]: [
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            items: [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-fw pi-home',
                    routerLink: '/',
                },
            ],
        },
        {
            label: 'Configuración',
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                    label: 'Usuarios',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Usuarios',
                            icon: 'pi pi-fw pi-users',
                            routerLink: '/usuarios',
                        },
                        {
                            label: 'Crear Usuario',
                            icon: 'pi pi-fw pi-plus',
                            routerLink: '/usuarios/add',
                        },
                    ],
                },
                {
                    label: 'Productos',
                    icon: 'pi pi-fw pi-box',
                    items: [
                        {
                            label: 'Productos',
                            icon: 'pi pi-fw pi-box',
                            routerLink: '/productos',
                        },
                        {
                            label: 'Crear Producto',
                            icon: 'pi pi-fw pi-plus',
                            routerLink: '/productos/add',
                        },
                    ],
                },
                {
                    label: 'Inventario',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Movimientos Inventario',
                            icon: 'pi pi-fw pi-list',
                            routerLink: '/movimientos',
                        },
                    ],
                },
                {
                    label: 'Categorías',
                    icon: 'pi pi-fw pi-tags',
                    items: [
                        {
                            label: 'Categorías',
                            icon: 'pi pi-fw pi-tags',
                            routerLink: '/categorias',
                        },
                        {
                            label: 'Crear Categoría',
                            icon: 'pi pi-fw pi-plus',
                            routerLink: '/categorias/add',
                        },
                    ],
                },
                {
                    label: 'Proveedores',
                    icon: 'pi pi-fw pi-truck',
                    items: [
                        {
                            label: 'Proveedores',
                            icon: 'pi pi-fw pi-truck',
                            routerLink: '/proveedores',
                        },
                        {
                            label: 'Crear Proveedor',
                            icon: 'pi pi-fw pi-plus',
                            routerLink: '/proveedores/add',
                        },
                    ],
                },
            ],
        },

        {
            label: 'Reportes',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: '/reportes',
        },
    ],
    [Roles.EMPLEADO]: [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/' },
        {
            label: 'Productos',
            icon: 'pi pi-fw pi-box',
            routerLink: '/productos',
        },
        {
            label: 'Categorías',
            icon: 'pi pi-fw pi-tags',
            routerLink: '/categorias',
        },
        {
            label: 'Ventas',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: '/ventas',
        },
    ],
};
