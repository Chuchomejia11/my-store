import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

// Instancia de Prisma
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Obtenemos la fecha de hoy y calculamos 7 días atrás
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);

        // Formateamos las fechas al formato que Prisma entiende (Date object)
        const salesData = await prisma.venta.groupBy({
            by: ['fecha'],
            _count: {
                id: true // Cuenta el número de registros
            },
            where: {
                fecha: {
                    gte: startDate,
                    lte: today
                }
            },
            orderBy: {
                fecha: 'asc'
            }
        });
        const result = salesData.map((sale: { fecha: Date; _count: { id: number } }) => ({
            dia: sale.fecha.toISOString().split('T')[0], // Formateamos la fecha
            compras: sale._count.id // Número de registros por día
        }));
        const groupedResult = result.reduce((acc: { dia: string; compras: number }[], curr: { dia: string; compras: number }) => {
            const existing = acc.find((item) => item.dia === curr.dia);
            if (existing) {
                existing.compras += curr.compras;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);
        groupedResult.sort((a: { dia: string; compras: number }, b: { dia: string; compras: number }) => new Date(a.dia).getTime() - new Date(b.dia).getTime());
        res.status(200).json(groupedResult);
    } catch (error) {
        console.error('Error al obtener los datos de ventas:', error);
        res.status(500).json({ message: 'Error al obtener los datos de ventas' });
    }
}
