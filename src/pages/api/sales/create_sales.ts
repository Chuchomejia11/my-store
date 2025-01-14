import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        console.log('Método no permitido:', req.method); // Log para métodos no permitidos
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { employeeNumber, ventas, pago, cambio, tipoPagoId, descuento } = req.body;

    // Validar los datos de entrada
    if (!employeeNumber || !ventas || !pago || typeof cambio === 'undefined' || !tipoPagoId) {
        console.log('Faltan datos obligatorios:', { employeeNumber, ventas, pago, cambio, tipoPagoId, descuento }); // Log datos recibidos
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    try {
        await prisma.$transaction(async (tx: PrismaClient) => {
            const nuevaVenta = await tx.venta.create({
                data: {
                    employeeNumber: employeeNumber,
                    ventas: ventas,
                    pago: pago,
                    cambio: cambio,
                    tipoPagoId: tipoPagoId,
                    fecha: new Date(),
                    descuento: descuento
                }
            });
            await tx.ingreso.create({
                data: {
                    employeeNumber,
                    tipoMovimientoId: 1, 
                    monto: pago,
                    fecha: new Date()
                }
            });
            if (cambio > 0) {
                await tx.egreso.create({
                    data: {
                        employeeNumber,
                        tipoMovimientoId: 2, // Asegúrate de usar el ID correspondiente para egresos
                        monto: cambio,
                        fecha: new Date()
                    }
                });
            }

            res.status(201).json({
                message: 'Venta creada exitosamente',
                venta: nuevaVenta
            });
        });
    } catch (error) {
        console.error('Error al procesar la venta:', error);
        res.status(500).json({
            message: 'Error al procesar la venta',
            error: (error instanceof Error ? error.message : 'Unknown error')
        });
    }
}
