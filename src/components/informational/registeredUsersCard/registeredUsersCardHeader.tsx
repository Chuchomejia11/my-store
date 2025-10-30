// components/ui/RegisteredUsersCardHeader.tsx
import { Flex, Text, useColorModeValue, HStack, Button } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import { moverAtras, moverAdelante } from "@/redux/slices/dateSlice";
import dayjs from "dayjs";
import { moverAdelante, moverAtras } from "@/redux/slices/dateHomeSlice";
import { RootState } from "@/redux/store";

export const RegisteredUsersCardHeader = () => {
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const titleColor = useColorModeValue("#0D47A1", "whiteAlpha.900");
    const dateColor = useColorModeValue("#0D47A1", "gray.300");

    const fecha = useSelector((state: RootState) => state.dateHome.fecha)
    const dispatch = useDispatch();

    // Fecha de inicio del rango de 7 días
    const fechaInicio = dayjs(fecha);
    const fechaFin = fechaInicio.add(6, "day"); // 7 días totales

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

            <HStack spacing={2}>
                <Button
                    size="sm"
                    padding={0}
                    onClick={() => dispatch(moverAtras())}
                    leftIcon={<FaChevronLeft  style={{margin:0, color:dateColor}}/>}
                    variant="ghost"
                >
                    {/* opcional: dejar vacío si solo quieres el icono */}
                </Button>

                <Text fontSize="24px" fontWeight="bold" color={dateColor}>
                    {fechaInicio.format("MMM • D")} – {fechaFin.format("D")}
                </Text>

                <Button
                    size="sm"
                    padding={0}
                    onClick={() => dispatch(moverAdelante())}
                    rightIcon={<FaChevronRight style={{margin:0, color:dateColor}} />}
                    variant="ghost"
                >
                    {/* opcional: dejar vacío si solo quieres el icono */}
                </Button>
            </HStack>
        </Flex>
    );
};
