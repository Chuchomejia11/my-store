import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        console.log('Método no permitido:', req.method);
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { employeeNumber, ventas, pago, cambio, tipoPagoId, descuento } = req.body;

    // Validar los datos de entrada
    if (!employeeNumber || !ventas || !pago || typeof cambio === 'undefined' || !tipoPagoId) {
        console.log('Faltan datos obligatorios:', { employeeNumber, ventas, pago, cambio, tipoPagoId, descuento });
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    try {
        // Crear una venta
        const nuevaVenta = await prisma.venta.create({
            data: {
                employeeNumber,
                ventas,
                pago,
                cambio,
                tipoPagoId,
                fecha: new Date(),
                descuento: descuento || 0,
            },
        });

        console.log('Venta creada:', nuevaVenta);

        // Crear el ingreso asociado
        const nuevoIngreso = await prisma.ingreso.create({
            data: {
                employeeNumber,
                tipoMovimientoId: 1,
                monto: pago,
                fecha: new Date(),
            },
        });

        console.log('Ingreso registrado:', nuevoIngreso);

        // Registrar el egreso si hay cambio
        if (cambio > 0) {
            const nuevoEgreso = await prisma.egreso.create({
                data: {
                    employeeNumber,
                    tipoMovimientoId: 2, // Asegúrate de usar el ID correcto
                    monto: cambio,
                    fecha: new Date(),
                },
            });

            console.log('Egreso registrado:', nuevoEgreso);
        }

        res.status(201).json({
            message: 'Venta creada exitosamente',
            venta: nuevaVenta,
        });
    } catch (error) {
        console.error('Error al procesar la venta:', error);
        res.status(500).json({
            message: 'Error al procesar la venta',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
