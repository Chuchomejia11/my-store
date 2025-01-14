import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Solo aceptamos solicitudes POST
    if (req.method === 'POST') {
        const { name, tipoProductoId, precioSugerido, precioTienda, estatus } = req.body;

        // Verificar que todos los campos requeridos están presentes
        if (!name || !tipoProductoId || !precioSugerido || !precioTienda || !estatus) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Validar que los precios sean números válidos
        const precioSugeridoFloat = parseFloat(precioSugerido);
        const precioTiendaFloat = parseFloat(precioTienda);

        // Verificar si los precios son números válidos
        if (isNaN(precioSugeridoFloat) || isNaN(precioTiendaFloat)) {
            return res.status(400).json({ error: 'Los precios deben ser números válidos' });
        }

        // Convertir tipoProductoId y estatusProductoId a enteros si son cadenas
        const tipoProductoIdInt = parseInt(tipoProductoId);

        let estatusProductoIdInt = 1;

        // <option value="Disponible">Nuevo</option>
        //                     <option value="Usado">Usado</option>
        //                     <option value="Reparado">Reparado</option>
        //                     <option value="Defecuso">Defectuoso</option>

        if (estatus === 'Nuevo') {
            estatusProductoIdInt = 1;
        } else if (estatus === 'Usado') {
            estatusProductoIdInt = 2;
        }
        else if (estatus === 'Reparado') {
            estatusProductoIdInt = 3;
        }
        else if (estatus === 'Defectuoso') {
            estatusProductoIdInt = 4;
        }
        

        // Verificar que las conversiones de ID hayan sido exitosas
        if (isNaN(tipoProductoIdInt) || isNaN(estatusProductoIdInt)) {
            return res.status(400).json({ error: 'El tipo de producto o el estatus no son válidos' });
        }

        console.log('Datos recibidos:', req.body);
        console.log('Precios:', precioSugeridoFloat, precioTiendaFloat);
        console.log('IDs:', tipoProductoIdInt, estatusProductoIdInt);

        try {
            // Crear el producto
            const producto = await prisma.producto.create({
                data: {
                    name,     
                    tipoProductoId: tipoProductoIdInt, // ID de tipoProducto
                    precioSugerido: precioSugeridoFloat,   // Usar número flotante
                    precioTienda: precioTiendaFloat,       // Usar número flotante
                    fechaAñadido: new Date(),             // Fecha de creación
                    estatusProductoId: estatusProductoIdInt, // ID de estatusProducto
                    estatus // Puede ser "nuevo", "usado", "dañado", etc.
                }
            });

            // Responder con el producto creado
            res.status(201).json({ message: 'Producto creado con éxito', producto });
        } catch (error) {
            console.error('Error al crear producto:', error);
            res.status(500).json({ error: 'Algo salió mal. Intenta de nuevo más tarde.' });
        }
    } else {
        // Si no es una solicitud POST, devolver un error
        res.status(405).json({ error: 'Método no permitido' });
    }
}
