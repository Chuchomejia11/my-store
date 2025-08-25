import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Input,
  Text,
  TableContainer,
  Divider,
} from '@chakra-ui/react';
import { FiEdit, FiCheck } from 'react-icons/fi'; // Iconos de React Icons

type User = {
  id: number;
  name: string;
  email: string;
  role: 'Administrador';
  status: 'Activo';
};

const initialUsers: User[] = [
  { id: 1, name: 'Administrador 1', email: 'juan@example.com', role: 'Administrador', status: 'Activo' }
];

export const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>('');

  const startEditing = (user: User) => {
    setEditingId(user.id);
    setEditedName(user.name);
  };

  const saveName = (userId: number) => {
    setUsers(prev =>
      prev.map(user => (user.id === userId ? { ...user, name: editedName } : user))
    );
    setEditingId(null);
    setEditedName('');
  };

  return (
    <Box p={4}>
      <TableContainer borderWidth="1px" borderRadius="md" overflowX="auto">
        <Table variant="simple">
          <Thead bg="gray.100">
            <Tr>
              <Th>Nombre</Th>
              <Th>Correo</Th>
              <Th>Rol</Th>
              <Th>Estatus</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <React.Fragment key={user.id}>
                <Tr>
                  <Td>
                    {editingId === user.id ? (
                      <Input
                        size="sm"
                        value={editedName}
                        onChange={e => setEditedName(e.target.value)}
                      />
                    ) : (
                      <Text>{user.name}</Text>
                    )}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.status}</Td>
                  <Td textAlign="center">
                    {editingId === user.id ? (
                      <IconButton
                        aria-label="Guardar"
                        icon={<FiCheck />}
                        size="sm"
                        colorScheme="green"
                        onClick={() => saveName(user.id)}
                        variant="ghost"
                      />
                    ) : (
                      <IconButton
                        aria-label="Editar"
                        icon={<FiEdit />}
                        size="sm"
                        onClick={() => startEditing(user)}
                        variant="ghost"
                      />
                    )}
                  </Td>
                </Tr>
                {index < users.length - 1 && (
                  <Tr>
                    <Td colSpan={5} p={0}>
                      <Divider />
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
