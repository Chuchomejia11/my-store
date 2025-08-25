import { Box, Card, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useMemo } from 'react';

// Datos de prueba en duro
const users = [
  {
    id: 1,
    no_sindical: '002',
    no_escalafon: 'B456',
    nombre: 'Luis Gómez',
    correo: 'luis@example.com',
    nombre_rol: 'Técnico',
    categoria: 'Sob.',
    apartado: 'Sob. A',
    base_o_dvt: 'MEX',
  },
  {
    id: 2,
    no_sindical: '003',
    no_escalafon: 'C789',
    nombre: 'Ana Martínez',
    correo: 'ana@example.com',
    nombre_rol: 'Supervisor',
    categoria: 'ESB',
    apartado: 'ESB A',
    base_o_dvt: 'GDL',
  },
  {
    id: 3,
    no_sindical: '004',
    no_escalafon: 'D123',
    nombre: 'Carlos Rivera',
    correo: 'carlos@example.com',
    nombre_rol: 'Analista',
    categoria: 'Sob.',
    apartado: 'Sob. B',
    base_o_dvt: 'MTY',
  },
  {
    id: 4,
    no_sindical: '005',
    no_escalafon: 'E234',
    nombre: 'Sofía Hernández',
    correo: 'sofia@example.com',
    nombre_rol: 'Ingeniero',
    categoria: 'ESB',
    apartado: 'ESB A',
    base_o_dvt: 'MEX',
  },
  {
    id: 5,
    no_sindical: '006',
    no_escalafon: 'F345',
    nombre: 'Daniel Torres',
    correo: 'daniel@example.com',
    nombre_rol: 'Operador',
    categoria: 'Sob.',
    apartado: 'Sob. C',
    base_o_dvt: 'TIJ',
  },
  {
    id: 6,
    no_sindical: '007',
    no_escalafon: 'G456',
    nombre: 'Laura Jiménez',
    correo: 'laura@example.com',
    nombre_rol: 'Técnico',
    categoria: 'ESB',
    apartado: 'ESB B',
    base_o_dvt: 'CUN',
  },
  {
    id: 7,
    no_sindical: '008',
    no_escalafon: 'H567',
    nombre: 'Miguel López',
    correo: 'miguel@example.com',
    nombre_rol: 'Supervisor',
    categoria: 'Sob.',
    apartado: 'Sob. A',
    base_o_dvt: 'MEX',
  },
  {
    id: 8,
    no_sindical: '009',
    no_escalafon: 'I678',
    nombre: 'Patricia Ruiz',
    correo: 'patricia@example.com',
    nombre_rol: 'Analista',
    categoria: 'ESB',
    apartado: 'ESB C',
    base_o_dvt: 'GDL',
  },
  {
    id: 9,
    no_sindical: '010',
    no_escalafon: 'J789',
    nombre: 'Jorge Ramírez',
    correo: 'jorge@example.com',
    nombre_rol: 'Ingeniero',
    categoria: 'Sob.',
    apartado: 'Sob. B',
    base_o_dvt: 'MTY',
  },
  {
    id: 10,
    no_sindical: '011',
    no_escalafon: 'K890',
    nombre: 'Gabriela Flores',
    correo: 'gabriela@example.com',
    nombre_rol: 'Operador',
    categoria: 'ESB',
    apartado: 'ESB A',
    base_o_dvt: 'TIJ',
  },
  {
    id: 11,
    no_sindical: '012',
    no_escalafon: 'L901',
    nombre: 'Héctor Díaz',
    correo: 'hector@example.com',
    nombre_rol: 'Técnico',
    categoria: 'Sob.',
    apartado: 'Sob. C',
    base_o_dvt: 'CUN',
  },
  {
    id: 12,
    no_sindical: '013',
    no_escalafon: 'M012',
    nombre: 'María León',
    correo: 'maria@example.com',
    nombre_rol: 'Supervisor',
    categoria: 'ESB',
    apartado: 'ESB B',
    base_o_dvt: 'MEX',
  },
  {
    id: 13,
    no_sindical: '014',
    no_escalafon: 'N123',
    nombre: 'Raúl Vázquez',
    correo: 'raul@example.com',
    nombre_rol: 'Analista',
    categoria: 'Sob.',
    apartado: 'Sob. A',
    base_o_dvt: 'GDL',
  },
  {
    id: 14,
    no_sindical: '015',
    no_escalafon: 'O234',
    nombre: 'Elena Castillo',
    correo: 'elena@example.com',
    nombre_rol: 'Ingeniero',
    categoria: 'ESB',
    apartado: 'ESB C',
    base_o_dvt: 'MTY',
  },
  {
    id: 15,
    no_sindical: '016',
    no_escalafon: 'P345',
    nombre: 'Fernando Morales',
    correo: 'fernando@example.com',
    nombre_rol: 'Operador',
    categoria: 'Sob.',
    apartado: 'Sob. B',
    base_o_dvt: 'TIJ',
  },
  {
    id: 16,
    no_sindical: '017',
    no_escalafon: 'Q456',
    nombre: 'Isabel Ortega',
    correo: 'isabel@example.com',
    nombre_rol: 'Técnico',
    categoria: 'ESB',
    apartado: 'ESB A',
    base_o_dvt: 'CUN',
  },
  {
    id: 17,
    no_sindical: '018',
    no_escalafon: 'R567',
    nombre: 'Ricardo Herrera',
    correo: 'ricardo@example.com',
    nombre_rol: 'Supervisor',
    categoria: 'Sob.',
    apartado: 'Sob. C',
    base_o_dvt: 'MEX',
  },
  {
    id: 18,
    no_sindical: '019',
    no_escalafon: 'S678',
    nombre: 'Alejandra Soto',
    correo: 'alejandra@example.com',
    nombre_rol: 'Analista',
    categoria: 'ESB',
    apartado: 'ESB B',
    base_o_dvt: 'GDL',
  },
  {
    id: 19,
    no_sindical: '020',
    no_escalafon: 'T789',
    nombre: 'Diego Méndez',
    correo: 'diego@example.com',
    nombre_rol: 'Ingeniero',
    categoria: 'Sob.',
    apartado: 'Sob. A',
    base_o_dvt: 'MTY',
  },
  {
    id: 20,
    no_sindical: '021',
    no_escalafon: 'U890',
    nombre: 'Verónica Chávez',
    correo: 'veronica@example.com',
    nombre_rol: 'Operador',
    categoria: 'ESB',
    apartado: 'ESB C',
    base_o_dvt: 'TIJ',
  },
];



export const UsersTable = () => {
  const { value: searchField, selectedField, orderBy, activeFilters } = useSelector((state: RootState) => state.search);

  const filteredUsers = useMemo(() => {
    let result = [...users];


    if (searchField.trim() !== '' && selectedField) {
      const searchValue = searchField.toLowerCase();
      result = result.filter((user) => {
        const val = user[selectedField as keyof typeof user]?.toString().toLowerCase() || '';
        return val.includes(searchValue);
      });
    }
    // Aplicar filtros
    if (activeFilters.length > 0) {
      result = result.filter((user) =>
        activeFilters.every((filter) =>
          Object.values(user).some((v) => v === filter)
        )
      );
    }

    if (orderBy) {
      result.sort((a, b) => {
        const valA = a[orderBy.field as keyof typeof a];
        const valB = b[orderBy.field as keyof typeof b];

        // Verificamos si los valores son strings (usamos localeCompare), de lo contrario comparamos como números o cualquier otro tipo
        const comparison =
          typeof valA === 'string' && typeof valB === 'string'
            ? valA.localeCompare(valB)
            : valA > valB
            ? 1
            : valA < valB
            ? -1
            : 0;

        return orderBy.direction === 'desc' ? -comparison : comparison;
      });
    }

      return result;
    }, [searchField, selectedField, orderBy, activeFilters]);

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
            {filteredUsers.map((user, idx) => (
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
            {filteredUsers.length === 0 && (
              <Tr>
                <Td colSpan={8}>
                  <Text textAlign="center" color="gray.500">No se encontraron resultados</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
};
