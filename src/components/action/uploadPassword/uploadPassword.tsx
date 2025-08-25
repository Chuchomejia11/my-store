import { FiEye, FiEyeOff } from 'react-icons/fi';
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  HStack,
  Container,
  CardHeader,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useUpdatePassword } from "@/hooks/useUpdatePassword"; // Ajusta la ruta
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const UploadPassword = () => {
  const userAuth = useSelector((state: RootState) => state.auth);
  const toast = useToast();

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const mutation = useUpdatePassword();

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!userAuth.token) {
      toast({
        title: "Usuario no autenticado.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    mutation.mutate(
      {
        userId: "2",
        currentPassword: form.currentPassword,
        password: form.newPassword,
      },
      {
        onSuccess: (res) => {
          toast({
            title: res.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        },
        onError: (err) => {
          toast({
            title: err.response?.data?.message || "Error al actualizar la contraseña.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Box
      w="100%"
      bgImage="url(/rectangle-12.svg)"
      bgSize="100% 100%"
      py={16}
      px={8}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Container centerContent>
        <Card w="full" shadow="lg" border="none" borderRadius="lg">
          <CardHeader
            as="h1"
            color="#0d47a1"
            fontFamily="'Open Sans', Helvetica"
            fontWeight="bold"
            textAlign="center"
            mb={10}
          >
            Cambiar contraseña
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardBody p={6}>
              <VStack spacing={6} align="stretch">

                {/** Contraseña actual */}
                <PasswordField
                  label="Contraseña actual"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  show={showPassword.current}
                  onToggle={() => togglePasswordVisibility("current")}
                />

                {/** Nueva contraseña */}
                <PasswordField
                  label="Nueva contraseña"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  show={showPassword.new}
                  onToggle={() => togglePasswordVisibility("new")}
                />

                {/** Confirmar contraseña */}
                <PasswordField
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  show={showPassword.confirm}
                  onToggle={() => togglePasswordVisibility("confirm")}
                />

                <Box display="flex" justifyContent="center" pt={4}>
                  <Button
                    type="submit"
                    isLoading={mutation.isPending}
                    w="240px"
                    h="57px"
                    bg="#1565c0"
                    color="white"
                    borderRadius="11px"
                    fontSize="base"
                    fontWeight="semibold"
                    fontFamily="'Poppins', Helvetica"
                    _hover={{ bg: "#0d47a1" }}
                    _active={{ bg: "#0d47a1" }}
                  >
                    Cambiar contraseña
                  </Button>
                </Box>
              </VStack>
            </CardBody>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

// Subcomponente reutilizable para inputs de contraseña
interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  show: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: () => void;
}

const PasswordField = ({
  label,
  name,
  value,
  show,
  onChange,
  onToggle,
}: PasswordFieldProps) => (
  <FormControl>
    <HStack spacing={4} align="center">
      <FormLabel
        w="224px"
        fontSize="base"
        fontWeight="normal"
        color="#0d47a1"
        opacity={0.8}
        fontFamily="'Poppins', Helvetica"
        mb={0}
        flexShrink={0}
      >
        {label}
      </FormLabel>
      <InputGroup>
        <Input
          name={name}
          value={value}
          onChange={onChange}
          type={show ? "text" : "password"}
          h="57px"
          borderRadius="10px"
          borderColor="#0d47a1"
          _focus={{
            borderColor: "#0d47a1",
            boxShadow: "0 0 0 1px #0d47a1",
          }}
        />
        <InputRightElement h="57px">
          <IconButton
            aria-label={show ? "Hide password" : "Show password"}
            icon={show ? <FiEyeOff /> : <FiEye />}
            variant="ghost"
            color="#0d47a1"
            onClick={onToggle}
            size="sm"
          />
        </InputRightElement>
      </InputGroup>
    </HStack>
  </FormControl>
);
