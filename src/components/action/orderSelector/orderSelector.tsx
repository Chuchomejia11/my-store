import { Box, Button, Text, Flex } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setOrderBy } from '@/redux/slices/searchSlice';
import { useState } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const orderOptions = [
  { label: 'Num. sindical', field: 'no_sindical' },
  { label: 'Nombre', field: 'nombre' },
  { label: 'Nombre rol', field: 'nombre_rol' },
  { label: 'Registro', field: 'registro' },
];

export const OrderSelector = () => {
  const dispatch = useDispatch();
  const orderBy = useSelector((state: RootState) => state.search.orderBy);
  const [isActive, setIsActive] = useState(false);

  const handleSelect = (field: string, direction: 'asc' | 'desc') => {
    dispatch(setOrderBy({ field, direction }));
    setIsActive(false);
  };

  const handleReset = () => {
    dispatch(setOrderBy(null));
    setIsActive(false);
  };

  const getLabel = () => {
    if (!orderBy) return 'Ordenar por';
    const label = orderOptions.find(o => o.field === orderBy.field)?.label;
    const arrow = orderBy.direction === 'asc' ? '↑' : '↓';
    return `Ordenado por: ${label} ${arrow}`;
  };

  return (
    <Box position="relative" width="fit-content">
      <Button
        variant="outline"
        borderWidth="1px"
        width="100%"
        onClick={() => setIsActive(!isActive)}
        justifyContent="space-between"
        borderRadius={'full'}
        borderColor={'#0D47A1'}
      >
        <Text>{getLabel()}</Text>
      </Button>

      {isActive && (
        <Box
          position="absolute"
          zIndex="10"
          top="100%"
          left="0"
          width="fit-content"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="md"
          pt={3}
          mt={2}
        >
          <Flex flexDir={'column'}align="stretch" >
            {orderOptions.map((option) => (
            <Flex  key={option.field} flexDir={'column'}align="stretch"  >
                <Button
                  variant="outline"
                  size="sm"
                  width="100%"
                  onClick={() => handleSelect(option.field, 'asc')}
                  rightIcon={<FiArrowUp />}
                  borderBottom="1px solid #90A4AE"
                  borderRadius={0}       // Quita redondeo
                  borderTop="none"       // Asegura que solo tenga borde inferior
                  borderLeft="none"
                  borderRight="none"
                >
                  {option.label}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  width="100%"
                  onClick={() => handleSelect(option.field, 'desc')}
                  rightIcon={<FiArrowDown />}
                  borderBottom="1px solid #90A4AE"
                  borderRadius={0}
                  borderTop="none"
                  borderLeft="none"
                  borderRight="none"
                >
                  {option.label}
                </Button>
              </Flex>
            ))}

            <Button
              bg="blue.500"
              color="white"
              borderRadius="0 0 8px 8px"          // quita redondeo si no quieres
              onClick={handleReset}
              _hover={{ bg: 'blue.600' }}
            >
              Restablecer
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
