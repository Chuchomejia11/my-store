import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client/extension';

const prisma = new PrismaClient();

async function createSession(employeeNumber: string, password: string, verificationEmail: string) {
  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de saltos para bcrypt

  // Crear la sesión con la fecha actual
  const newSession = await prisma.session.create({
    data: {
      employeeNumber,          // Número de empleado
      password: hashedPassword, // Contraseña cifrada
      verificationEmail,       // Correo de verificación
      startTime: new Date(),    // Fecha de inicio de sesión (hora actual)
      // endTime: null,           // Esto podría ser opcional si deseas dejarlo vacío por ahora
      verificationToken: ''     // Token de verificación vacío por ahora, puede agregarse más tarde
    }
  });

  console.log('Session created:', newSession);
  return newSession;
}

// Ejemplo de uso
createSession('202301001', 'securePassword123', 'juan.perez@example.com')
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });

