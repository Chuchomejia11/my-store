import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { employeeNumber, password } = req.body;

        try {
            const employee = await prisma.employee.findUnique({
                where: { employeeNumber },
                include: { session: true }
            });

            if (!employee) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }

            const isPasswordValid = await bcrypt.compare(password, employee.session?.password || '');
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // Verifica que la variable JWT_SECRET esté definida
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                return res.status(500).json({ message: 'Se requiere una clave secreta para generar el token' });
            }

            const token = jwt.sign(
                { employeeNumber: employee.employeeNumber, email: employee.email },
                jwtSecret, // Usa la variable de entorno JWT_SECRET
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } catch (error) {
            console.error('Error en el login:', error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    } else {
        res.status(405).json({ message: 'Método HTTP no permitido' });
    }
}
