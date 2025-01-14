import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DashboardHeader } from '@/components/structure/dashboardHeader/DashboardHeader';
import { LoadingCurtaing } from '@/components/informational/loadingCurtain/loadingCurtain';
import { login } from '@/redux/slices/authSlice';
import NavBarDesktop from '@/components/action/navBarDesktop/navBarDesktop';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { GraphSalesWithPeriod } from '@/components/action/graphSales/graphSalesWithPeriod';

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userAuth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!userAuth.token) {
            router.push('/login');
        } else if (userAuth.firstLogin && userAuth.employeeNumber) {
            setTimeout(() => {
                dispatch(
                    login({
                        token: userAuth.token ?? '',
                        employeeNumber: userAuth.employeeNumber ?? '',
                        firstLogin: false
                    })
                );
            }, 5000);
        }
    }, [userAuth.token, userAuth.firstLogin, userAuth.employeeNumber, dispatch, router]);

    return (
        <div role="main">
            <DashboardHeader />
            {userAuth.firstLogin && <LoadingCurtaing cargado={true} />}
            <NavBarDesktop />
            <Box
                p={4}
                marginLeft={{ base: '0px', sm: '0px', md: '250px', lg: '250px', xl: '250px' }}
                display={{ base: 'none', md: 'block' }}
            >
                <Grid templateColumns={{ base: "repeat(24, 1fr)", lg: "repeat(12, 1fr)" }} gap={4}>
                    <GridItem colSpan={{ base: 20, lg: 8 }} colStart={{ base: 3, lg: 3 }} p={4}>
                        <GraphSalesWithPeriod />
                    </GridItem>
                </Grid>
            </Box>
        </div>
    );
}
