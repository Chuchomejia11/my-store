// pages/index.tsx
import { NavBarDesktop } from '@/components/action/navBarDesktop/navBarDesktop';
import NavBarMobile from '@/components/navBarMobile/navBarMobile';
// import { GraphSales } from '@/components/action/graphSales/graphSales';
import { Box, Grid, GridItem, HStack, Text, useBreakpointValue, Flex, Button} from '@chakra-ui/react';
import { SidebarProvider } from '@/context/SidebarContext';
import { useState } from 'react';
import { SearchWithFilters } from '@/components/action/searchWithFilters/searchWithFilters';
import { OrderSelector } from '@/components/action/orderSelector/orderSelector';
import { FilterSelector } from '@/components/action/filterSelector/filterSelector';
import { UsersTable } from '@/components/informational/usersTable/usersTable';
import { FilteredBarChart } from '@/components/informational/filteredBarChart/filteredBarChart';

export default function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showPercentage, setShowPercentage] = useState(true);
  const total = 300; // Total users
  const completed = 240; // Completed users
  const pending = total - completed;
  const completedPercent = Math.round((completed / total) * 100);
  const pendingPercent = 100 - completedPercent;
  // ⚠️ Solo usamos useSidebar dentro de SidebarProvider
  const Content = () => {

    return (
        <Box display="flex" flexDirection="row" minHeight="100vh" alignItems="flex-start" justifyContent="flex-start" width="100vw">
          {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
          
          <Box p={4} transition="margin-left 0.3s ease" width="100%">
            
            {/* 👉 Aquí va tu HEADER */}
            <Box
              as="header"
              width="100%"
              paddingY={4}
              paddingX={6}
              borderRadius="md"
              boxShadow="sm"
              marginBottom={4}
            >
            <Grid templateColumns="repeat(12, 1fr)" rowGap={4}>
            {/* Fila 1 */}
            <GridItem colSpan={12}>
              <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Box fontSize="4xl" fontWeight="bold" color="#0D47A1">
                  Lista de usuarios
                </Box>
                <HStack spacing={8} align="flex-end">
                  <Box textAlign="center">
                    <Text fontSize="md" fontWeight="bold" color="#2DD849">
                        {showPercentage ? `${completedPercent}%` : `${completed}`}
                    </Text>
                    <Text fontWeight="bold" color="#2DD849">Usuarios</Text>
                  </Box>
                  <Box textAlign="center">
                    
                    <Text fontSize="md" fontWeight="bold" color="#F32F30">
                      {showPercentage ? `${pendingPercent}%` : `${pending}`}
                  </Text>
                  <Text fontWeight="bold" color="#F32F30">Usuarios </Text>
                  </Box>
                </HStack>
              </Flex>
            </GridItem>

            {/* Fila 2 */}
            <GridItem colSpan={12}>
              <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={4}>
                {/* Izquierda: Input + botones */}
                <HStack spacing={3}>
                  <SearchWithFilters />
                  <OrderSelector />
                  <FilterSelector />
                  
                  {/* <Button size="sm" colorScheme="green">Exportar</Button> */}
                </HStack>

                {/* Derecha: Toggle botón */}
                <Button
                  mt={4}
                  size="sm"
                  onClick={() => setShowPercentage(prev => !prev)}
                  colorScheme="blue"
                  marginRight={'40px'}
              >
                  {showPercentage ? 'Cantidad' : 'Porcentaje'}
              </Button>
              </Flex>
            </GridItem>
            
            </Grid>
            </Box>

            {/* 👉 Aquí sigue el contenido principal */}
            <Grid templateColumns="repeat(12, 1fr)" gap={4} width="100%">
               <GridItem colSpan={{ base: 12, lg: 19 }} p={4}>
                <UsersTable />
              </GridItem>
               <GridItem colSpan={12}>
                <FilteredBarChart />
              </GridItem>
            </Grid>

          </Box>
        </Box>

        );
    };



  return (
    <>
     
        <SidebarProvider>
          <Content />
        </SidebarProvider>
    </>
  );
}
