// pages/index.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { login } from '@/redux/slices/authSlice';
import { LoadingCurtaing } from '@/components/informational/loadingCurtain/loadingCurtain';
import { NavBarDesktop } from '@/components/action/navBarDesktop/navBarDesktop';
import NavBarMobile from '@/components/navBarMobile/navBarMobile';
// import { GraphSales } from '@/components/action/graphSales/graphSales';
import { Box, Grid, useBreakpointValue } from '@chakra-ui/react';
import { SidebarProvider } from '@/context/SidebarContext';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userAuth = useSelector((state: RootState) => state.auth);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // ⚠️ Solo usamos useSidebar dentro de SidebarProvider
  const Content = () => {

    return (
        <Box display={'flex'} flexDirection="row" minHeight="100vh" alignItems="center" justifyContent="flex-start">
            {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
            <Box
            p={4}
            transition="margin-left 0.3s ease"
            >
              <Head>
                <title>Lista de Usuarios | ASSA Admin</title>
              </Head>
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                {/* <GridItem colSpan={{ base: 12, lg: 8 }} p={4}>
                    <RegisteredUsersCard />
                </GridItem>
                <GridItem colSpan={{ base: 12, lg: 4 }} p={4}>
                    <NumberUsersButton />
                </GridItem> */}
            </Grid>
            </Box>
        </Box>
        );
    };

  // ⏳ Lógica de redirección y login inicial
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
    <>
      {userAuth.firstLogin && <LoadingCurtaing cargado={true} />}
      {/* Solo mostramos todo si el usuario tiene sesión */}
      {userAuth.token && (
        <SidebarProvider>
          <Content />
        </SidebarProvider>
      )}
    </>
  );
}