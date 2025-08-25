import {
  Input,
  Text,
  Box,
  Radio,
  RadioGroup,
  Flex
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSearchValue, setSelectedField } from '@/redux/slices/searchSlice';
import { SearchField } from '@/types/types';

const allFields: { label: string; value: SearchField }[] = [
  { label: 'No. sindical', value: 'no_sindical' },
  { label: 'No. Escalafón', value: 'no_escalafon' },
  { label: 'Nombre', value: 'nombre' },
  { label: 'Nombre de rol', value: 'nombre_rol' },
  { label: 'Correo', value: 'correo' },
];

export const SearchWithFilters = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.search.value);
  const selectedField = useSelector((state: RootState) => state.search.selectedField);

  return (
    <Box position="relative" width="250px">
      <Input
        placeholder="Buscar..."
        value={value}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
        borderRadius={'full'}
        borderColor={'#0D47A1'}
      />

      {value.length > 0 && (
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
          p={4}
        >
          <Text fontWeight="bold" mb={2}>
            Buscar por:
          </Text>
          <RadioGroup
            value={selectedField || ''}
            onChange={(val) => dispatch(setSelectedField(val as SearchField))}
          >
            <Flex flexDir={'row'} align="start" gap='13px'>
              {allFields.map(({ label, value }) => (
                <Radio key={value} value={value}>
                  {label}
                </Radio>
              ))}
            </Flex>
          </RadioGroup>
        </Box>
      )}
    </Box>
  );
};
