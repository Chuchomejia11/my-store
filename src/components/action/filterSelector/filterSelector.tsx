import { Box, Button, VStack, Text, Checkbox, Divider } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearFilters, toggleFilter } from '@/redux/slices/searchSlice';
import { useState } from 'react';

const filterOptions = {
  'Categoría': ['ESB', 'Sob.'],
  'Apartado': [ 'ESB A', 'Sob. A', 'ESB o Sob. B', '6x4'],
  'Base o DVT': ['MEX', 'GDL', 'MTY','CUN', 'TIJ']
};



export const FilterSelector = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.search.activeFilters || []);
  const [isActive, setIsActive] = useState(false);

  const handleToggleFilter = (value: string) => {
  dispatch(toggleFilter(value));
};

  const handleReset = () => {
  dispatch(clearFilters());
  setIsActive(false);
};

  return (
    <Box position="relative" width="250px">
      <Button
        variant="outline"
        borderWidth="1px"
        width="100%"
        onClick={() => setIsActive(!isActive)}
        justifyContent="space-between"
        borderRadius={'full'}
        borderColor={'#0D47A1'}
      >
        <Text>
          {selectedFilters.length > 0
            ? `Filtros seleccionados: ${selectedFilters.length}`
            : 'Seleccionar filtros'}
        </Text>
      </Button>

      {isActive && (
        <Box
          position="absolute"
          zIndex="10"
          top="100%"
          left="0"
          width="100%"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="md"
          pt={3}
          mt={2}
          maxHeight="300px"
          overflowY="auto"
        >
          <VStack align="stretch" spacing={2} >
            {Object.entries(filterOptions).map(([groupTitle, options]) => (
              <Box key={groupTitle} padding={'3px 8px'} borderBottom={'2px solid #90A4AE'}>
                <Text fontWeight="bold" fontSize="sm" mb={1} textAlign={'center'} color={'#90A4AE'}>
                  {groupTitle}
                </Text>
                <VStack align="start" spacing={1} pl={2} >
                  {options.map((opt) => (
                    <Checkbox
                      key={opt}
                      isChecked={selectedFilters.includes(opt)}
                      onChange={() => handleToggleFilter(opt)}
                    >
                      {opt}
                    </Checkbox>
                  ))}
                </VStack>
                <Divider my={2} />
              </Box>
            ))}

            <Button
              bg="blue.500"
              color="white"
              borderRadius="0 0 8px 8px"
              onClick={handleReset}
              _hover={{ bg: 'blue.600' }}
            >
              Restablecer
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};