// pages/api/ventas.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getVentasPaginated } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10 } = req.query;

    try {
        const pageNum = parseInt(page as string);
        const size = parseInt(pageSize as string);

        const result = await getVentasPaginated(pageNum, size);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching ventas data' });
        console.error('Error fetching ventas data:', error);
    }
}
