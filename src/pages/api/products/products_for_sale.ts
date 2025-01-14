import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Obtener productos con estatusProductoId 1, 2 o 3
        const productos = await prisma.producto.findMany({
            where: {
                estatusProductoId: { in: [1, 2, 3] } // Filtrar por estatusProductoId
            },
            select: {
                id: true,
                name: true,
                precioSugerido: true,
                precioTienda: true,
                estatus: true,
                estatusProducto: {
                    select: {
                        name: true // Opcional: incluir el nombre del estatus
                    }
                }
            }
        });

        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Error al obtener productos', error: errorMessage });
    }
}
