import { NextApiRequest, NextApiResponse } from 'next';
import { getProductosPaginated } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10 } = req.query;

    try {
        const productos = await getProductosPaginated(Number(page), Number(pageSize));

        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}
