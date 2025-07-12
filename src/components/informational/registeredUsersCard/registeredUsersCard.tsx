
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { RegisteredUsersCardHeader } from "./registeredUsersCardHeader";
import RegisteredUsersCardOptions from "./registeredUsersCardOptions";
import { RegisteredUsersChart } from "./registeredUsersChart";

export const RegisteredUsersCard = () => {
    const [selectedType, setSelectedType] = useState<"Categoria" | "Apartado" | "Base o DVT">("Categoria");

    return (
        <Box borderRadius="xl" overflow="hidden"  minW="540px"  boxShadow="0px 20px 60px 0px rgba(86, 122, 176, 0.456)">
        <RegisteredUsersCardHeader/>
        <RegisteredUsersCardOptions
            selectedType={selectedType}
            setSelectedType={setSelectedType}
        />
        <RegisteredUsersChart selectedType={selectedType} />
        </Box>
    );
};
