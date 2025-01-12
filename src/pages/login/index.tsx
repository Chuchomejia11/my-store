import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/authSlice';

const Login = () => {
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ employeeNumber, password })
            });

            const data = await response.json(); // Convertir la respuesta a JSON

            if (response.ok) {
                const { token } = data; // Extraer el token de los datos devueltos
                dispatch(login({ token, employeeNumber })); // Guardar el token en Redux
                router.push('/'); // Redirigir al dashboard después de un inicio de sesión exitoso
            } else {
                setError(data.message); // Mostrar el mensaje de error del servidor
            }
        } catch (err) {
            setError('Error en la conexión');
            console.error(err);
        }
    };

    return (
        <Box maxW="lg" mx="auto" mt="20">
            <form onSubmit={handleLogin}>
                <Stack spacing={4} padding={5} borderWidth={1} borderRadius="md" boxShadow="lg">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                        Iniciar sesión
                    </Text>

                    {error && (
                        <Text color="red.500" textAlign="center">
                            {error}
                        </Text>
                    )}

                    <FormControl id="employeeNumber" isRequired>
                        <FormLabel>Número de empleado</FormLabel>
                        <Input
                            type="text"
                            value={employeeNumber}
                            onChange={(e) => setEmployeeNumber(e.target.value)}
                            placeholder="Número de empleado"
                        />
                    </FormControl>

                    <FormControl id="password" isRequired>
                        <FormLabel>Contraseña</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="blue" width="full">
                        Iniciar sesión
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default Login;
