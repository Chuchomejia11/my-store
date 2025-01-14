import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Solo aceptamos solicitudes PUT para actualizar
    if (req.method === 'PUT') {
        const { id, name, tipoProductoId, precioSugerido, precioTienda, estatus } = req.body;

        // Verificar que el ID y los demás campos requeridos están presentes
        if (!id || !name || !tipoProductoId || !precioSugerido || !precioTienda || !estatus) {
            return res.status(400).json({ error: 'Todos los campos son requeridos, incluido el ID del producto' });
        }

        // Validar que los precios sean números válidos
        const precioSugeridoFloat = parseFloat(precioSugerido);
        const precioTiendaFloat = parseFloat(precioTienda);

        if (isNaN(precioSugeridoFloat) || isNaN(precioTiendaFloat)) {
            return res.status(400).json({ error: 'Los precios deben ser números válidos' });
        }

        // Convertir tipoProductoId y estatusProductoId a enteros
        const tipoProductoIdInt = parseInt(tipoProductoId);
        let estatusProductoIdInt = 1;

        if (estatus === 'Nuevo') {
            estatusProductoIdInt = 1;
        } else if (estatus === 'Usado') {
            estatusProductoIdInt = 2;
        } else if (estatus === 'Reparado') {
            estatusProductoIdInt = 3;
        } else if (estatus === 'Defectuoso') {
            estatusProductoIdInt = 4;
        }

        if (isNaN(tipoProductoIdInt) || isNaN(estatusProductoIdInt)) {
            return res.status(400).json({ error: 'El tipo de producto o el estatus no son válidos' });
        }

        try {
            // Actualizar el producto por ID
            const producto = await prisma.producto.update({
                where: { id: parseInt(id) }, // Asegúrate de que el ID sea un número
                data: {
                    name,
                    tipoProductoId: tipoProductoIdInt,
                    precioSugerido: precioSugeridoFloat,
                    precioTienda: precioTiendaFloat,
                    estatusProductoId: estatusProductoIdInt,
                    estatus
                }
            });

            res.status(200).json({ message: 'Producto actualizado con éxito', producto });
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            res.status(500).json({ error: 'Algo salió mal. Intenta de nuevo más tarde.' });
        }
    } else {
        // Si no es una solicitud PUT, devolver un error
        res.status(405).json({ error: 'Método no permitido' });
    }
}
