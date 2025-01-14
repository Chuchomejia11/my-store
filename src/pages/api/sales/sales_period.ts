import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { period } = req.query;

        if (!period || typeof period !== 'string') {
            return res.status(400).json({ message: 'Se requiere un período válido: semana, mes, trimestre o año.' });
        }

        const today = new Date();
        let startDate: Date;
        let groupByField: string; // Campo para agrupar (día, semana, mes)

        // Configurar fechas y agrupamientos según el período
        switch (period) {
            case 'semana':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 7);
                groupByField = 'dia';
                break;

            case 'mes':
                startDate = new Date(today);
                startDate.setMonth(today.getMonth() - 1);
                groupByField = 'semana';
                break;

            case 'trimestre':
                startDate = new Date(today);
                startDate.setMonth(today.getMonth() - 3);
                groupByField = 'semana';
                break;

            case 'año':
                startDate = new Date(today);
                startDate.setFullYear(today.getFullYear() - 1);
                groupByField = 'mes';
                break;

            default:
                return res.status(400).json({ message: 'Período no válido. Use: semana, mes, trimestre o año.' });
        }

        // Obtener datos de ventas de la base de datos
        const salesData = await prisma.venta.findMany({
            where: {
                fecha: {
                    gte: startDate,
                    lte: today,
                },
            },
        });

        // Agrupar los datos según el campo calculado
        const groupedData = salesData.reduce((acc: { [key: string]: number }, sale: { fecha: string }) => {
            let groupKey: string;

            const saleDate = new Date(sale.fecha);
            switch (groupByField) {
                case 'dia':
                    groupKey = saleDate.toISOString().split('T')[0]; // Agrupamiento por día
                    break;

                case 'semana':
                    const weekStart = new Date(saleDate);
                    weekStart.setDate(saleDate.getDate() - saleDate.getDay());
                    groupKey = weekStart.toISOString().split('T')[0]; // Agrupamiento por semana (primer día)
                    break;

                case 'mes':
                    groupKey = `${saleDate.getFullYear()}-${(saleDate.getMonth() + 1).toString().padStart(2, '0')}`; // Agrupamiento por mes
                    break;

                default:
                    groupKey = saleDate.toISOString();
            }

            acc[groupKey] = (acc[groupKey] || 0) + 1; // Contar ventas por grupo
            return acc;
        }, {});

        // Convertir el resultado en un formato adecuado para la respuesta
        const result = Object.entries(groupedData).map(([key, count]) => ({
            periodo: key,
            compras: count,
        }));

        result.sort((a, b) => new Date(a.periodo).getTime() - new Date(b.periodo).getTime());
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener los datos de ventas:', error);
        res.status(500).json({ message: 'Error al obtener los datos de ventas.' });
    }
}
