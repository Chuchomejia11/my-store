// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVentasPaginated = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [ventas, totalCount] = await Promise.all([
        prisma.venta.findMany({
            skip,
            take,
            orderBy: {
                fecha: 'desc' // Ordenar por fecha descendente
            },
            include: {
                employee: true, // Información del empleado
                tipoPago: true, // Información del tipo de pago
                ventaProductos: {
                    include: {
                        producto: true // Información de los productos vendidos
                    }
                }
            }
        }),
        prisma.venta.count() // Contar el total de registros
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
        ventas,
        pagination: {
            totalCount,
            totalPages,
            currentPage: page,
            hasNextPage,
            hasPreviousPage
        }
    };
};
