import { useState } from 'react';
import { Box, Card, Table, Thead, Tbody, Tr, Th, Td, Text, Spinner, Alert, AlertIcon, Button, Flex } from '@chakra-ui/react';
import { useUsersTable } from '@/hooks/userTable';

export const UsersTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const perPage = 100;
  const { users, pagination, loading, error } = useUsersTable(page, perPage);

  if (loading) {
    return (
      <Card maxW="100%" overflowX="auto" p={4}>
        <Box minW="1282px" display="flex" justifyContent="center" alignItems="center" height="200px">
          <Spinner size="lg" color="#0D47A1" />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card maxW="100%" overflowX="auto" p={4}>
        <Box minW="1282px" display="flex" justifyContent="center" alignItems="center" height="200px">
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        </Box>
      </Card>
    );
  }

  return (
    <Card maxW="100%" overflowX="auto" p={4}>
      <Box minW="1282px">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>No. Sindical</Th>
              <Th>No. Escalafón</Th>
              <Th>Nombre</Th>
              <Th>Correo</Th>
              <Th>Nombre Rol</Th>
              <Th>Categoría</Th>
              <Th>Apartado</Th>
              <Th>Base o DVT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, idx) => (
              <Tr key={idx}>
                <Td>{user.no_sindical}</Td>
                <Td>{user.no_escalafon}</Td>
                <Td>{user.nombre}</Td>
                <Td>{user.correo}</Td>
                <Td>{user.nombre_rol}</Td>
                <Td>{user.categoria}</Td>
                <Td>{user.apartado}</Td>
                <Td>{user.base_o_dvt}</Td>
              </Tr>
            ))}
            {users.length === 0 && (
              <Tr>
                <Td colSpan={8}>
                  <Text textAlign="center" color="gray.500">No se encontraron resultados</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {pagination && (
          <Flex justify="space-between" mt={4}>
            <Button
              onClick={() => setPage(page - 1)}
              isDisabled={page === 1}
              colorScheme="blue"
            >
              Anterior
            </Button>
            <Text>
              Página {pagination.current_page} de {pagination.last_page}
            </Text>
            <Button
              onClick={() => setPage(page + 1)}
              isDisabled={page === pagination.last_page}
              colorScheme="blue"
            >
              Siguiente
            </Button>
          </Flex>
        )}
      </Box>
    </Card>
  );
};
