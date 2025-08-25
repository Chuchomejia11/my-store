import { Box, Button,
     Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const NumberUsersButton = () => {
    const router = useRouter();
    return (
        <Box
            display="flex" 
            justifyContent="space-between" 
            alignItems="center"
            p={1} 
            borderRadius="xl"
            paddingRight={4} 
            paddingLeft={4}
            overflow="hidden"  
            w={'100%'} 
            boxShadow="0px 20px 60px 0px rgba(86, 122, 176, 0.456)"
            >
                <Box 
                    display="flex" 
                    flexDirection={'column'}
                    justifyContent="space-evenly" 
                    alignItems="center"
                    height={'100%'}
                    p={1} 
                    bg="white" 
                >
                    <Box fontSize="24px" fontWeight="bold" color="#0D47A1">
                        300
                    </Box>
                    <Image src="/images/icon-users.svg" alt="Users Icon" boxSize="37px" />
                    <Box fontSize="16px" color="#0D47A1">
                        Total de Usuarios
                    </Box>
                </Box>
                <Button
                    onClick={() => router.push('/lista-usuarios')}
                    colorScheme="buttonsBlue"
                    borderRadius="10px"
                    borderTop="1px solid"
                    borderColor="gray.200"
                    height={'42px'}
                    w={'114px'}
                >
                    Ver lista
                </Button>
            </Box>
        );
    };
