// Definir tipos para los elementos relacionados
export interface Producto {
    id: number;
    name: string;
    tipoProductoId: number;
    tipoProducto: TipoProducto;
    precioSugerido: number;
    precioTienda: number;
    fechaAñadido: string; // Usar un tipo adecuado para Date si es necesario
    estatusProductoId: number;
    estatusProducto: EstatusProducto;
    estatus: string; // "nuevo", "usado", etc.
}

export interface TipoProducto {
    id: number;
    name: string;
}

export interface EstatusProducto {
    id: number;
    name: string;
}

export interface TipoPago {
    id: number;
    name: string;
}

export interface VentaProducto {
    id: number;
    ventaId: number;
    productoId: number;
    producto: Producto; // Relación con Producto
}

export interface Employee {
    employeeNumber: string;
    firstName: string;
    lastName: string;
    secondLastName: string;
    rfc: string;
    email: string;
    phoneNumber?: string;
}

export interface Venta {
    id: number;
    employeeNumber: string;
    ventas: VentaProducto[]; // Los artículos vendidos, arreglo de productos vendidos
    pago: number;
    cambio: number;
    tipoPagoId: number;
    tipoPago: TipoPago;
    fecha: string; // Formato de fecha adecuado
    descuento?: number;
    employee: Employee; // Relación con el empleado
    ventaProductos: VentaProducto[]; // Relación con los productos vendidos
}
