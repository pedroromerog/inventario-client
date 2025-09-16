export enum TipoProveedor {
    PRODUCTOS = 'productos',
    SERVICIOS = 'servicios',
    EQUIPOS = 'equipos',
    MATERIALES = 'materiales',
    LOGISTICA = 'logistica',
    TECNOLOGIA = 'tecnologia',
    OTROS = 'otros'
}

export const TiposProveedor = [
    { value: TipoProveedor.PRODUCTOS, label: 'Productos' },
    { value: TipoProveedor.SERVICIOS, label: 'Servicios' },
    { value: TipoProveedor.EQUIPOS, label: 'Equipos' },
    { value: TipoProveedor.MATERIALES, label: 'Materiales' },
    { value: TipoProveedor.LOGISTICA, label: 'Logística' },
    { value: TipoProveedor.TECNOLOGIA, label: 'Tecnología' },
    { value: TipoProveedor.OTROS, label: 'Otros' }
];

export enum EstadoProveedor {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
    SUSPENDIDO = 'suspendido',
    EN_REVISION = 'en_revision'
}
export const EstadosProveedor = [
    { value: EstadoProveedor.ACTIVO, label: 'Activo' },
    { value: EstadoProveedor.INACTIVO, label: 'Inactivo' },
    { value: EstadoProveedor.SUSPENDIDO, label: 'Suspendido' },
    { value: EstadoProveedor.EN_REVISION, label: 'En Revisión' }
];
