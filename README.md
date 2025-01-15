# Proyecto Store 01

**Store 01** es un proyecto para una pequeña tienda enfocado en la gestión de ventas e inventario. Está desarrollado utilizando **React** para el frontend, y **Node.js** junto con **TypeScript** para el backend. El proyecto utiliza **Prisma** como ORM para interactuar con una base de datos SQL, asegurando una gestión eficiente de la información.

Este sistema permite llevar el control de inventario, registrar ventas, y gestionar productos de manera sencilla, aprovechando tecnologías modernas tanto para el frontend como para el backend.


## Vista Previa en Línea 
El sistema está precargado en [Vercel](https://my-store-ruddy-kappa.vercel.app/), donde puedes ver una vista en vivo de su funcionamiento. 
### Credenciales de acceso para prueba: 
- **Número de cuenta:** `202301001` 
- **Contraseña:** `securePassword123` 
Haz login para explorar las funcionalidades del sistema.

## Dependencias Importantes

A continuación, se detallan algunas de las dependencias más relevantes del proyecto y sus versiones:

### **Frontend:**
- **React** (`^19.0.0`): Biblioteca de JavaScript para construir interfaces de usuario. Usada en el frontend para el desarrollo de componentes interactivos y dinámicos.
- **Next.js** (`15.1.4`): Framework para React que permite la creación de aplicaciones web con renderizado del lado del servidor (SSR) y generación de sitios estáticos.
- **@chakra-ui/react** (`^2.10.4`): Un popular framework de diseño de componentes para React que facilita la creación de interfaces accesibles y elegantes.
- **@emotion/react** y **@emotion/styled** (`^11.14.0`): Librerías para escribir estilos CSS en JavaScript de manera eficiente y dinámica dentro de componentes React.
- **Framer Motion** (`^11.17.0`): Librería para crear animaciones interactivas en React.

### **Backend:**
- **Node.js** con **Express** (`^4.21.2`): Framework minimalista y flexible para Node.js, utilizado para construir el servidor backend del proyecto.
- **Prisma** (`^6.2.1`): ORM (Object Relational Mapping) para interactuar con la base de datos SQL de manera eficiente y segura.
- **bcryptjs** (`^2.4.3`): Librería para el cifrado de contraseñas y seguridad en el backend.
- **jsonwebtoken** (`^9.0.2`): Para la creación y verificación de JSON Web Tokens (JWT), utilizado para la autenticación segura.
- **dotenv** (`^16.4.7`): Utilizada para cargar variables de entorno desde un archivo `.env`.

### **Otras dependencias clave:**
- **Axios** (`^1.7.9`): Librería para hacer solicitudes HTTP desde el frontend y backend.
- **Redux Toolkit** (`^2.5.0`): Herramienta para gestionar el estado global de la aplicación de manera eficiente.
- **Recharts** (`^2.15.0`): Librería para crear gráficos interactivos y visualizaciones de datos en React.

Estas dependencias permiten construir tanto el frontend como el backend del sistema de manera eficiente, optimizando el rendimiento y la experiencia del usuario.
## Ejecución del Proyecto en Entorno Local

Para ejecutar **Store 01** en tu entorno local, asegúrate de tener instalados los siguientes requisitos previos:

### Requisitos Previos:
- **Node.js**: Debes tener **Node.js** instalado en tu máquina. Puedes descargarlo desde [aquí](https://nodejs.org/).
- **React**: React se instalará automáticamente al ejecutar los pasos de instalación del proyecto.
- **PostgreSQL** (Versión 16): Asegúrate de tener PostgreSQL instalado en tu máquina. Puedes descargarlo desde [aquí](https://www.postgresql.org/download/).

### Pasos para ejecutar el proyecto:

1. **Clona el repositorio**:
   Abre tu terminal y clona el proyecto en tu máquina local:
   ```
   git clone https://github.com/Chuchomejia11/my-store.git
   cd store-01
   ```
2. **Configurar la base de datos**:
 Asegúrate de tener PostgreSQL corriendo en tu máquina local. Si aún no tienes PostgreSQL, puedes instalarlo desde [aquí](https://www.postgresql.org/download/). Luego, crea una nueva base de datos o usa una base de datos existente. Si no sabes cómo, puedes usar el siguiente comando para crear una base de datos:
	```
	createdb db_name
	```
3. **Configurar el archivo `.env`**: Crea un archivo `.env` en la raíz del proyecto, si aún no existe, y agrega las siguientes variables de entorno. Asegúrate de reemplazar `username`, `password`, `localhost`, y `db_name` con los valores correctos para tu configuración de PostgreSQL:
	```
		DATABASE_URL=postgresql://username:password@localhost:5432/db_name
		JWT_SECRET=cadenaSecreta 
		``
4. **Instalar las dependencias**: 
Una vez dentro de la carpeta del proyecto, ejecuta el siguiente comando para instalar las dependencias necesarias: 
	```bash 
	npm install
	```
5. **Generar el cliente de Prisma**: 
Después de instalar las dependencias, debes generar el cliente de Prisma para que puedas interactuar con la base de datos:
	```bash 
	npx prisma generate
	
6. **Ejecutar las migraciones de la base de datos**:
 Ahora, ejecuta las migraciones para crear y actualizar las tablas de la base de datos con Prisma:	
	```bash 
		npx prisma migrate dev
		
7. **Construir el proyecto**: 
	A continuación, realiza la construcción del proyecto para preparar los archivos optimizados para producción:
	```bash 
		npm run build
	```
8. **Sembrar la base de datos con datos de ejemplo**: 
Una vez construido el proyecto, puedes ejecutar el script para sembrar la base de datos con datos iniciales para empezar a trabajar:		
	```bash 
	npm run seed
9. **Ejecutar las pruebas**:
Para asegurarte de que todo funciona correctamente, ejecuta las pruebas de la aplicación:
	```bash
	npm run test
10. **Iniciar el proyecto**: 
Finalmente, puedes iniciar el servidor de desarrollo:
	```bash
	npm run dev
Esto levantará el servidor en `http://localhost:3000`. Abre esa URL en tu navegador para ver la aplicación en funcionamiento.

### Problemas comunes:
-   **Errores de conexión a la base de datos**: Si encuentras problemas para conectarte a la base de datos, asegúrate de que PostgreSQL esté funcionando correctamente y que las credenciales en el archivo `.env` sean correctas.
-   **Errores en las migraciones**: Si hay problemas al ejecutar las migraciones, verifica que Prisma esté instalado correctamente y que la base de datos exista.
Con estos pasos, deberías poder ejecutar el proyecto sin problemas en tu entorno local.

## Arquitectura del Proyecto 
El proyecto está organizado de manera modular para facilitar su mantenimiento y escalabilidad. A continuación, se describe brevemente su estructura:
	```
	src/ ├── api/ ├── components/ │ ├── actions/ │ ├── structural/ │ ├── informational/ │  ├── pages/ └── _app.ts
	```

Cada carpeta está diseñada para cumplir una función específica dentro del proyecto, lo que permite mantener un flujo de trabajo eficiente y organizado.


## Esquema de Prisma

El proyecto utiliza Prisma como ORM para gestionar la base de datos. El esquema define las entidades, relaciones y restricciones necesarias para el sistema. A continuación, se describen los modelos principales:

### Modelos del Esquema

#### 1. `Employee`
Representa a los empleados del sistema.
- **Campos principales**:
  - `employeeNumber` (ID único).
  - `firstName`, `lastName`, `secondLastName` (nombre completo).
  - `rfc`, `email` (campos únicos).
  - `phoneNumber` (opcional).
- **Relaciones**:
  - Relación uno a uno con `Session`.
  - Relación uno a muchos con `Venta`, `Ingreso`, y `Egreso`.
- **Índices**:
  - Índice en `email` para consultas rápidas.

#### 2. `Session`
Gestión de sesiones de los empleados.
- **Campos principales**:
  - `id` (clave primaria autoincremental).
  - `employeeNumber` (relación con `Employee`).
  - `password`, `verificationEmail` y `verificationToken`.
- **Relaciones**:
  - Relación uno a uno con `Employee`.
- **Índices**:
  - Índices en `verificationEmail` y `verificationToken`.

#### 3. `Producto`
Define los productos disponibles.
- **Campos principales**:
  - `id` (clave primaria autoincremental).
  - `name` (nombre del producto).
  - `precioSugerido`, `precioTienda` (precios).
  - `fechaAñadido` (fecha de registro).
  - `estatus` (e.g., nuevo, usado, dañado).
- **Relaciones**:
  - Relación muchos a uno con `TipoProducto` y `EstatusProducto`.
  - Relación uno a muchos con `VentaProducto`.
- **Índices**:
  - Índices en `name`, `fechaAñadido`, y `precioSugerido`.

#### 4. `TipoProducto` y `EstatusProducto`
Clasifican los productos por tipo y estado, respectivamente.
- **Campos principales**:
  - `id` (clave primaria autoincremental).
  - `name` (nombre del tipo o estado).
- **Relaciones**:
  - Relación uno a muchos con `Producto`.

#### 5. `Venta`
Registra las ventas realizadas.
- **Campos principales**:
  - `id` (clave primaria autoincremental).
  - `ventas` (lista de artículos vendidos en formato JSON).
  - `pago`, `cambio`, y `descuento` (detalles de pago).
  - `fecha` (fecha de la venta).
- **Relaciones**:
  - Relación uno a uno con `Employee`.
  - Relación muchos a uno con `TipoPago`.
  - Relación uno a muchos con `VentaProducto`.

#### 6. `TipoPago`
Define los métodos de pago (e.g., efectivo, tarjeta).
- **Campos principales**:
  - `id` (clave primaria autoincremental).
  - `name` (nombre del tipo de pago).
- **Relaciones**:
  - Relación uno a muchos con `Venta`.

#### 7. `Ingreso` y `Egreso`
Registra los movimientos financieros (ingresos y egresos).
- **Campos principales**:
  - `id` (clave primaria autoincremental).
  - `monto` (cantidad del movimiento).
  - `fecha` (fecha del movimiento).
- **Relaciones**:
  - Relación muchos a uno con `TipoMovimiento`.
  - Relación uno a uno con `Employee`.

#### 8. `VentaProducto`
Conecta productos con ventas específicas.
- **Campos principales**:
  - `id` (clave primaria autoincremental).
  - `ventaId`, `productoId` (relaciones con `Venta` y `Producto`).
- **Relaciones**:
  - Relación muchos a uno con `Venta` y `Producto`.

### Notas Adicionales
- **Fuente de Datos**: Se utiliza PostgreSQL como base de datos, configurado a través de la variable de entorno `DATABASE_URL`.
- **Migraciones**: Asegúrate de ejecutar las migraciones con los siguientes comandos:
  ```bash
  npx prisma migrate dev
## Funcionamiento de las APIs 
Las APIs del proyecto están integradas directamente en el servidor del mismo proyecto React y funcionan como puntos de interacción entre el cliente y la base de datos. Utilizan **Prisma Client** para realizar consultas, inserciones y actualizaciones en la base de datos, asegurando eficiencia y seguridad. 
### Características principales: 
- **Interacción centralizada:** Las consultas `fetch` se realizan al propio servidor del proyecto, eliminando la necesidad de servicios externos.
- **Validación de datos:** Las APIs incluyen validaciones para asegurar que los datos enviados por el cliente sean correctos antes de procesarlos. 
-  **Manejo de errores:** Se implementan mensajes claros en caso de errores, facilitando la depuración. 
- **Prisma Client:** Se utiliza para gestionar la interacción con la base de datos mediante clases y métodos específicos, simplificando el código.
### Ejemplo del flujo de una API: 
1. **Recepción de datos:** Se valida el método HTTP permitido (por ejemplo, `POST`) y los datos enviados en el cuerpo de la solicitud. 
2. **Procesamiento de la solicitud:** - Creación de una nueva entrada en la base de datos, como una venta. - Registro de ingresos asociados a la venta. - Registro de egresos (si aplica) para reflejar correctamente los cambios monetarios. 
3. **Respuesta:** Se envía una respuesta JSON al cliente con la información de la operación realizada o un mensaje de error en caso de fallos.
