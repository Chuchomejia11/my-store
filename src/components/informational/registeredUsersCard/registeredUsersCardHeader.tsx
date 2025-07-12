// components/ui/RegisteredUsersCardHeader.tsx
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

export const RegisteredUsersCardHeader = () => {
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const titleColor = useColorModeValue("#0D47A1", "whiteAlpha.900");
    const dateColor = useColorModeValue("#0D47A1", "gray.300");

    return (
        <Flex
            px={6}
            py={4}
            borderColor={borderColor}
            align="center"
            justify="space-between"
        >
            <Text fontSize="24px" fontWeight="bold" color={titleColor}>
                Usuarios registrados
            </Text>

            <Text fontSize="24px" fontWeight="bold" color={dateColor}>
                Julio • 1–7
            </Text>
        </Flex>
    );
};
