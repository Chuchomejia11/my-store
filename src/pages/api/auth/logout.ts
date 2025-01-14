import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { employeeNumber, token } = req.body;

        // Validar parámetros
        if (!employeeNumber || typeof employeeNumber !== 'string') {
            return res.status(400).json({ message: 'Parámetro inválido: employeeNumber es requerido y debe ser un string' });
        }
        if (!token || typeof token !== 'string') {
            return res.status(400).json({ message: 'Parámetro inválido: token es requerido y debe ser un string' });
        }

        try {
            // Buscar la sesión
            const session = await prisma.session.findUnique({
                where: { employeeNumber: employeeNumber },
                include: { employee: true },
            });

            if (!session) {
                return res.status(404).json({ message: 'Sesión no encontrada' });
            }
            if (session.employee.employeeNumber !== employeeNumber) {
                return res.status(403).json({ message: 'Empleado no coincide con la sesión' });
            }

            // Actualizar el endTime de la sesión
            await prisma.session.update({
                where: { employeeNumber: employeeNumber },
                data: { endTime: new Date(), verificationToken: '' },
            });

            return res.status(200).json({ message: 'Logout exitoso' });
        } catch (error) {
            console.error('Error en el logout:', error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error: error instanceof Error ? error.message : 'Error desconocido',
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Método HTTP no permitido' });
    }
}
