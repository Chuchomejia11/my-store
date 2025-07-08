import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LoadingCurtaing } from '@/components/informational/loadingCurtain/loadingCurtain';
import { login } from '@/redux/slices/authSlice';
import NavBarDesktop from '@/components/action/navBarDesktop/navBarDesktop';
import { Box, Grid, GridItem, useBreakpointValue} from '@chakra-ui/react';
import { GraphSales } from '@/components/action/graphSales/graphSales';
import NavBarMobile from '@/components/navBarMobile/navBarMobile';
import { ProductsCard } from '@/components/action/productsCard/productsCadr';

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userAuth = useSelector((state: RootState) => state.auth);
    const isMobile = useBreakpointValue({ base: true, md: false });

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
            {userAuth.firstLogin && <LoadingCurtaing cargado={true} />}
            {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
            <Box
                p={4}
                marginLeft={{ base: '0px', sm: '0px', md: '250px', lg: '250px', xl: '250px' }}
            >
                <Grid templateColumns= 'repeat(12, 1fr)' gap={4}>
                    <GridItem colSpan={{ base: 12, lg: 8 }}  p={4}>
                        <GraphSales />
                    </GridItem>
                    <GridItem colSpan={{ base: 12, lg: 4 }}  p={4}>
                        <ProductsCard />
                    </GridItem>
                    <GridItem colSpan={12}  p={4} margin={'auto'}>
                    
                    </GridItem>
                </Grid>
            </Box>
        </div>
    );
}
