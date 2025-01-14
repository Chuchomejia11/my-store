import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Insertar datos de ejemplo para TipoProducto
    await prisma.tipoProducto.createMany({
        data: [
            { name: 'Pegatina' },
            { name: 'Ropa' },
            { name: 'Figuras' },
            { name: 'TCG' },
            { name: 'Consola' }
        ],
        skipDuplicates: true // Evitar duplicados
    });

    // Insertar datos de ejemplo para EstatusProducto
    await prisma.estatusProducto.createMany({
        data: [
            { name: 'Nuevo' },
            { name: 'Usado' },
            { name: 'Dañado' },
            { name: 'Abierto' }
        ],
        skipDuplicates: true // Evitar duplicados
    });

    // Insertar datos de ejemplo para TipoPago
    await prisma.tipoPago.createMany({
        data: [
            { name: 'Efectivo' },
            { name: 'Tarjeta' }
        ],
        skipDuplicates: true // Evitar duplicados
    });

    // Insertar datos de ejemplo para TipoMovimiento
    await prisma.tipoMovimiento.createMany({
        data: [
            { name: 'Venta' },
            { name: 'Gasto' },
            { name: 'Compra' },
            { name: 'Devolución por parte del proveedor' },
            { name: 'Devolución al parte del cliente' }
        ],
        skipDuplicates: true // Evitar duplicados
    });

    // Asegurarse de que el producto ya existe o se crea
    const producto = await prisma.producto.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'TTGL Pegatina 01',
            tipoProductoId: 1, // Pegatina
            precioSugerido: 200,
            precioTienda: 150,
            fechaAñadido: new Date(),
            estatusProductoId: 1, // Nuevo
            estatus: 'Disponible'
        }
    });

    // Asegurarse de que el ingreso ya existe o se crea
    await prisma.ingreso.upsert({
        where: { id: 1 },
        update: {},
        create: {
            tipoMovimiento: {
                connect: { id: 3 } // Conectar usando el id
            },
            monto: 500,
            fecha: new Date(),
            employee: {
                connect: { employeeNumber: '202301001' }
            }
        }
    });

    // Asegurarse de que el egreso ya existe o se crea
    await prisma.egreso.upsert({
        where: { id: 1 },
        update: {},
        create: {
            tipoMovimiento: {
                connect: { id: 2 } // Conectar usando el id
            },
            monto: 300,
            fecha: new Date(),
            employee: {
                connect: { employeeNumber: '202301001' }
            }
        }
    });

    // Asegurarse de que la venta ya existe o se crea
    await prisma.venta.upsert({
        where: { id: 1 },
        update: {},
        create: {
            employeeNumber: '202301001',
            ventas: JSON.stringify([{ productoId: producto.id, cantidad: 2 }]),
            pago: 300,
            cambio: 0,
            tipoPagoId: 1, // Efectivo
            fecha: new Date(),
            descuento: 10
        }
    });

    console.log('Datos insertados correctamente.');
}

// Llamar a la función principal para ejecutar el seeder
await main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// Función para insertar ventas aleatorias
async function seedProductos() {
    const tipoProductos = await prisma.tipoProducto.findMany();
    const estatusProductos = await prisma.estatusProducto.findMany();

    for (let i = 0; i < 50; i++) {
        const randomTipoProducto = tipoProductos[Math.floor(Math.random() * tipoProductos.length)];
        const randomEstatusProducto = estatusProductos[Math.floor(Math.random() * estatusProductos.length)];

        await prisma.producto.create({
            data: {
                name: faker.commerce.productName(),
                tipoProductoId: randomTipoProducto.id,
                precioSugerido: faker.number.int({ min: 100, max: 1000 }),
                precioTienda: faker.number.int({ min: 50, max: 900 }),
                fechaAñadido: faker.date.past({ years: 1 }),
                estatusProductoId: randomEstatusProducto.id,
                estatus: 'Disponible'
            }
        });
    }

    console.log('Productos insertados correctamente.');
}

await seedProductos()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


async function seedVentas() {
    const productos = await prisma.producto.findMany();
    const empleados = await prisma.employee.findMany();
    const tipoPagos = await prisma.tipoPago.findMany();

    for (let i = 0; i < 90; i++) {
        const randomEmpleado = empleados[Math.floor(Math.random() * empleados.length)];
        const randomTipoPago = tipoPagos[Math.floor(Math.random() * tipoPagos.length)];
        const ventas = [];

        for (let j = 0; j < 20; j++) {
            const randomProducto = productos[Math.floor(Math.random() * productos.length)];
            ventas.push({
                productoId: randomProducto.id,
                cantidad: faker.number.int({ min: 1, max: 5 })
            });
        }

        await prisma.venta.create({
            data: {
                employeeNumber: randomEmpleado.employeeNumber,
                ventas: JSON.stringify(ventas),
                pago: faker.number.int({ min: 100, max: 1000 }),
                cambio: faker.number.int({ min: 0, max: 100 }),
                tipoPagoId: randomTipoPago.id,
                fecha: faker.date.past({ years: 0.25 }), // Últimos 3 meses
                descuento: faker.number.int({ min: 0, max: 50 })
            }
        });
    }

    console.log('Ventas insertadas correctamente.');
}

await seedVentas()
    .then(async () => {
        const ventas = await prisma.venta.findMany();
        for (const venta of ventas) {
            // Crear ingreso correspondiente a la venta
            await prisma.ingreso.create({
                data: {
                    tipoMovimientoId: 1, // Venta
                    monto: venta.pago,
                    fecha: venta.fecha,
                    employeeNumber: venta.employeeNumber
                }
            });

            // Crear egreso correspondiente a la venta (simulando un costo)
            await prisma.egreso.create({
                data: {
                    tipoMovimientoId: 2, // Gasto
                    monto: venta.pago * 0.6, // Suponiendo que el costo es el 60% del pago
                    fecha: venta.fecha,
                    employeeNumber: venta.employeeNumber
                }
            });
        }
    })
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
