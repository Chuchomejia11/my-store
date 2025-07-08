import {  useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import React from 'react';
import { DashboardHeader } from '@/components/structure/dashboardHeader/DashboardHeader';
import { LoadingCurtaing } from '@/components/informational/loadingCurtain/loadingCurtain';
import NavBarDesktop from '@/components/action/navBarDesktop/navBarDesktop';
import { Box, Grid, GridItem,  useBreakpointValue} from '@chakra-ui/react';
import NavBarMobile from '@/components/navBarMobile/navBarMobile';

export default function Home() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const userAuth = useSelector((state: RootState) => state.auth);

   

    return (
        <div role="main">
            <DashboardHeader />
            {userAuth.firstLogin && <LoadingCurtaing cargado={true} />}
            {userAuth.firstLogin && <LoadingCurtaing cargado={true} />}
            {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
            <Box p={4} marginLeft={{ base: '0px', sm: '0px', md: '250px', lg: '250px', xl: '250px' }}>
                <Grid templateColumns= 'repeat(12, 1fr)' gap={4}>
                    <GridItem colSpan ={12}  p={4}>
                        
                    </GridItem>
                </Grid>
            </Box>
        </div>
    );
}
