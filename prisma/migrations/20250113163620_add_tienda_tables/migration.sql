-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tipoProductoId" INTEGER NOT NULL,
    "precioSugerido" DOUBLE PRECISION NOT NULL,
    "precioTienda" DOUBLE PRECISION NOT NULL,
    "fechaAñadido" TIMESTAMP(3) NOT NULL,
    "estatusProductoId" INTEGER NOT NULL,
    "estatus" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoProducto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TipoProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstatusProducto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EstatusProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venta" (
    "id" SERIAL NOT NULL,
    "employeeNumber" TEXT NOT NULL,
    "ventas" JSONB NOT NULL,
    "pago" DOUBLE PRECISION NOT NULL,
    "cambio" DOUBLE PRECISION NOT NULL,
    "tipoPagoId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "descuento" DOUBLE PRECISION,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoPago" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TipoPago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoMovimiento" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TipoMovimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingreso" (
    "id" SERIAL NOT NULL,
    "tipoMovimientoId" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "employeeNumber" TEXT NOT NULL,

    CONSTRAINT "Ingreso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Egreso" (
    "id" SERIAL NOT NULL,
    "tipoMovimientoId" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "employeeNumber" TEXT NOT NULL,

    CONSTRAINT "Egreso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VentaProducto" (
    "id" SERIAL NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,

    CONSTRAINT "VentaProducto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Producto_name_idx" ON "Producto"("name");

-- CreateIndex
CREATE INDEX "Producto_fechaAñadido_idx" ON "Producto"("fechaAñadido");

-- CreateIndex
CREATE INDEX "Producto_precioSugerido_idx" ON "Producto"("precioSugerido");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_tipoProductoId_fkey" FOREIGN KEY ("tipoProductoId") REFERENCES "TipoProducto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_estatusProductoId_fkey" FOREIGN KEY ("estatusProductoId") REFERENCES "EstatusProducto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_tipoPagoId_fkey" FOREIGN KEY ("tipoPagoId") REFERENCES "TipoPago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_employeeNumber_fkey" FOREIGN KEY ("employeeNumber") REFERENCES "Employee"("employeeNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingreso" ADD CONSTRAINT "Ingreso_tipoMovimientoId_fkey" FOREIGN KEY ("tipoMovimientoId") REFERENCES "TipoMovimiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingreso" ADD CONSTRAINT "Ingreso_employeeNumber_fkey" FOREIGN KEY ("employeeNumber") REFERENCES "Employee"("employeeNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Egreso" ADD CONSTRAINT "Egreso_tipoMovimientoId_fkey" FOREIGN KEY ("tipoMovimientoId") REFERENCES "TipoMovimiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Egreso" ADD CONSTRAINT "Egreso_employeeNumber_fkey" FOREIGN KEY ("employeeNumber") REFERENCES "Employee"("employeeNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaProducto" ADD CONSTRAINT "VentaProducto_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaProducto" ADD CONSTRAINT "VentaProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
