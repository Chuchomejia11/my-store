import { useUserStatusGauge } from "@/hooks/useUserStatusGauge";
import { Box, Button, Image, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const NumberUsersButton: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useUserStatusGauge();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={1}
        borderRadius="xl"
        paddingRight={4}
        paddingLeft={4}
        overflow="hidden"
        w="100%"
        boxShadow="0px 20px 60px 0px rgba(86, 122, 176, 0.456)"
        bg="white"
        height="100px"
      >
        <Spinner size="lg" color="#0D47A1" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={1}
        borderRadius="xl"
        paddingRight={4}
        paddingLeft={4}
        overflow="hidden"
        w="100%"
        boxShadow="0px 20px 60px 0px rgba(86, 122, 176, 0.456)"
        bg="white"
        height="100px"
      >
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

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
      w="100%"
      boxShadow="0px 20px 60px 0px rgba(86, 122, 176, 0.456)"
      bg="white"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
        height="100%"
        p={1}
      >
        <Box fontSize="24px" fontWeight="bold" color="#0D47A1">
          {data.total}
        </Box>
        <Image src="/images/icon-users.svg" alt="Users Icon" boxSize="37px" />
        <Box fontSize="16px" color="#0D47A1">
          Total de Usuarios
        </Box>
      </Box>
      <Button
        onClick={() => router.push("/lista-usuarios")}
        colorScheme="buttonsBlue"
        borderRadius="10px"
        borderTop="1px solid"
        borderColor="gray.200"
        height="42px"
        w="114px"
      >
        Ver lista
      </Button>
    </Box>
  );
};