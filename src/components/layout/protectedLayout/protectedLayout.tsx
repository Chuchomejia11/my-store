// components/layout/ProtectedLayout.tsx
import { SidebarProvider } from '@/context/SidebarContext';
import { NavBarDesktop } from '@/components/action/navBarDesktop/navBarDesktop';
import NavBarMobile from '@/components/navBarMobile/navBarMobile';
import { Box, useBreakpointValue } from '@chakra-ui/react';

export const ProtectedLayout = ({
    children,
    }: {
    children: React.ReactNode;
    }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <SidebarProvider>
        {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
        <Box
            p={4}
            transition="margin-left 0.3s ease"
        >
            {children}
        </Box>
        </SidebarProvider>
    );
};
