// User authentication types
export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    email: string;
    username?: string;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  // Form types
  export interface LoginFormData {
    emailOrUsername: string;
    password: string;
  }
  
  export interface LoginFormErrors {
    emailOrUsername?: string;
    password?: string;
    general?: string;
  }
  
  // API response types
  export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
    refreshToken: string;
  }
  
  // Component prop types
  export interface LoginFormProps {
    onSubmit: (credentials: LoginCredentials) => Promise<void>;
    isLoading?: boolean;
    error?: string | null;
  }
  
  export interface InputFieldProps {
    label: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
  }
  
  // Event handler types
  export type FormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
  export type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
  export type ButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  // Utility types
  export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;



  // Definir tipos para los elementos relacionados
export interface Producto {
    id: number;
    name: string;
    tipoProductoId: number;
    tipoProducto: TipoProducto; // Relación con TipoProducto
    precioSugerido: number;
    precioTienda: number;
    fechaAñadido: Date; // Usar Date en vez de string para coincidir con DateTime en Prisma
    estatusProductoId: number;
    estatusProducto: EstatusProducto; // Relación con EstatusProducto
    estatus: string; // Puede ser "nuevo", "usado", etc.
    ventas: VentaProducto[]; // Relación con VentaProducto
}

export interface TipoProducto {
    id: number;
    name: string;
    productos: Producto[]; // Relación con Producto
}

export interface EstatusProducto {
    id: number;
    name: string;
    productos: Producto[]; // Relación con Producto
}

export interface TipoPago {
    id: number;
    name: string;
    ventas: Venta[]; // Relación con Venta
}

export interface VentaProducto {
    id: number;
    ventaId: number;
    productoId: number;
    venta: Venta; // Relación con Venta
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
    session: Session | null; // Relación con Session
    ventas: Venta[]; // Relación con Venta
    ingresos: Ingreso[]; // Relación con Ingreso
    egresos: Egreso[]; // Relación con Egreso
}

export interface Session {
    id: number;
    employeeNumber: string;
    password: string;
    verificationEmail: string;
    startTime: Date; // Usar Date en vez de string para coincidir con DateTime
    endTime: Date | null; // Usar Date en vez de string para coincidir con DateTime
    verificationToken: string;
    employee: Employee; // Relación con Employee
}

export interface Venta {
    id: number;
    employeeNumber: string;
    ventas: string; // JSON con los productos vendidos (puedes adaptarlo como un objeto si prefieres)
    pago: number;
    cambio: number;
    tipoPagoId: number;
    tipoPago: TipoPago; // Relación con TipoPago
    fecha: Date; // Usar Date en vez de string para coincidir con DateTime
    descuento?: number;
    employee: Employee; // Relación con Employee
    ventaProductos: VentaProducto[]; // Relación con VentaProducto
}

export interface TipoMovimiento {
    id: number;
    name: string;
    ingresos: Ingreso[]; // Relación con Ingreso
    egresos: Egreso[]; // Relación con Egreso
}

export interface Ingreso {
    id: number;
    tipoMovimientoId: number;
    tipoMovimiento: TipoMovimiento; // Relación con TipoMovimiento
    monto: number;
    fecha: Date; // Usar Date en vez de string para coincidir con DateTime
    employeeNumber: string;
    employee: Employee; // Relación con Employee
}

export interface Egreso {
    id: number;
    tipoMovimientoId: number;
    tipoMovimiento: TipoMovimiento; // Relación con TipoMovimiento
    monto: number;
    fecha: Date; // Usar Date en vez de string para coincidir con DateTime
    employeeNumber: string;
    employee: Employee; // Relación con Employee
}

export type SearchField = 'no_sindical' | 'no_escalafon' | 'nombre' | 'nombre_rol' | 'correo';

export interface FiltersState {
  searchText: string;
  selectedFields: SearchField[];
  someOtherButtonFilter?: string; // puedes agregar más filtros si los botones lo requieren
}