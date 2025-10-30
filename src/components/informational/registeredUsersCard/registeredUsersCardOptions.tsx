// components/ui/RegisteredUsersCardOptions.tsx
import {
  Box,
  Flex,
  Button,
  Text,
  HStack
} from "@chakra-ui/react";
import React from "react";

const options = {
  Categoria: [
    { label: "ESB", color: "#8B6D1B" },
    { label: "Sob.", color: "#9EA7AA" },
  ],
  Apartado: [
    { label: "ESB A", color: "#ED330C" },
    { label: "Sob. A", color: "#386CB0" },
    { label: "ESB o Sob. B", color: "#F9A825" },
    { label: "6x4", color: "#2E7D32" },
  ],
  "Base o DVT": [
    { label: "MEX", color: "#D81B60" },
    { label: "GDL", color: "#8E24AA" },
    { label: "MTY", color: "#546E7A" },
    { label: "CUN", color: "#0097A7" },
    { label: "TIJ", color: "#8D6E63" },
  ],
};

interface RegisteredUsersCardOptionsProps {
  selectedType: keyof typeof options;
  setSelectedType: (type: keyof typeof options) => void;
}

export const RegisteredUsersCardOptions: React.FC<RegisteredUsersCardOptionsProps> = ({
  selectedType,
  setSelectedType,
}) => {
  const bgButton = "#8F9EB5";
  const activeBg = "#0D47A1";
  const borderColor = "#0D47A1";

  return (
    <Flex
        px={6}
        py={4}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={4}
    >
    

      {/* Derecha: Botones de categoría */}
        <Box>
            {Object.keys(options).map((key) => {
            const isActive = selectedType === key;

            return (
                <Button
                key={key}
                onClick={() => setSelectedType(key as keyof typeof options)}
                w="100px"
                h="26px"
                marginRight={2}
                fontSize="sm"
                borderRadius="18px"
                border="1px solid"
                borderColor={borderColor}
                bg={isActive ? activeBg : bgButton}
                color="white"
                _hover={{ bg: isActive ? activeBg : "#8F9EB5" }}
                >
                {key}
                </Button>
            );
            })}
        </Box>
        <Box
            width="30%"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)" // 2 columnas iguales
            gap={2} // espacio entre filas y columnas
        >
            {options[selectedType].map((item, idx) => (
                <HStack key={idx} spacing={2}>
                <Box
                    w="12px"
                    h="12px"
                    borderRadius="full"
                    bg={item.color}
                />
                <Text fontSize="sm" fontWeight="medium">
                    {item.label}
                </Text>
                </HStack>
            ))}
            </Box>
        </Flex>
    );
};
export default RegisteredUsersCardOptions;