import {
  Box,
  Button,
  VStack,
  Image,
  useColorMode,
  HStack,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useLogout } from '@/hooks/useLogout';
import { useDispatch, useSelector} from "react-redux";
import { RootState } from '@/redux/store';
import { toggleNavbar } from "@/redux/slices/navBarSlice";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

interface MenuItem {
  label: string;
  path: string;
  iconSrc: string;
  onClick: () => void;
}

export const NavBarDesktop = () => {
  const router = useRouter();
  const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.navBar.navbarOpen);
  const { colorMode } = useColorMode();
  const logout = useLogout();

  const toggleSidebar = () => dispatch(toggleNavbar())

  const sidebarWidth = isOpen ? "316px" : "75px";
  const iconSrc = isOpen
    ? "/images/icon-close.svg"
    : "/images/icon-open.svg";

  const logoWidth = useBreakpointValue({
    base: "100px",
    md: "130px",
    xl: "154px",
  });
  const logoHeight = useBreakpointValue({
    base: "90px",
    md: "120px",
    xl: "138px",
  });
  const iconSize = useBreakpointValue({
    base: "22px",
    md: "30px",
    xl: "35px",
  });
  const textSize = useBreakpointValue({
    base: "12px",
    md: "14px",
    xl: "16px",
  });
  const paddingLeft = useBreakpointValue({
    base: "12px",
    md: "20px",
    xl: "24px",
  });

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      path: "/",
      iconSrc: "/images/icon-home.svg",
      onClick: () => router.push("/"),
    },
    {
      label: "Lista de usuarios",
      path: "/lista-usuarios",
      iconSrc: "/images/icon-users.svg",
      onClick: () => router.push("/lista-usuarios"),
    },
    {
      label: "Perfil",
      path: "/perfil",
      iconSrc: "/images/icon-profile.svg",
      onClick: () => router.push("/perfil"),
    },
    {
      label: "Configuración",
      path: "/configuracion",
      iconSrc: "/images/icon-settings.svg",
      onClick: () => router.push("/configuracion"),
    },
  ];

  const logoutItem = {
    label: "Cerrar sesión",
    iconSrc: "/images/icon-logout.svg",
    onClick: () => logout(),
  };

  const isActive = (path: string) => router.pathname === path;

  const activeStyles = colorMode === "light"
    ? {
        bg: "#DBECFF",
        color: "#0D47A1",
        borderLeft: "10px solid #526E8E",
        borderBottom: "5px solid #759CC9",
      }
    : {
        bg: "gray.700",
        color: "teal.300",
        borderLeft: "10px solid teal",
        borderBottom: "5px solid teal.400",
      };

  const hoverStyles = colorMode === "light"
    ? { bg: "#E6F0FF", color: "#0D47A1" }
    : { bg: "gray.600", color: "teal.300" };

  const defaultColor = colorMode === "light" ? "#0D47A1" : "teal.300";

  

  return (
    <MotionBox
      as="aside"
      w={sidebarWidth}
      minH="100vh"
      bg={colorMode === "light" ? "white" : "gray.800"}
      color="white"
      transition={{ duration: 0.8, ease: "easeInOut" }}
      boxShadow="4px 0 8px -2px rgba(0,0,0,0.15)"
    >
      <Flex direction="column" h="100%" justify="space-between">
        {/* Logo + toggle */}
        <Box>
          <MotionBox
            display="flex"
            flexDirection={isOpen ? "row" : "column-reverse"}
            alignItems={isOpen ? "flex-start" : "center"}
            justifyContent={isOpen ? "space-between" : "center"}
            w="100%"
            p={4}
          >
            <MotionBox
              onClick={() => router.push("/")}
              cursor="pointer"
              initial={false}
              animate={{
                alignSelf: isOpen ? "flex-start" : "center",
                marginBottom: isOpen ? "0" : "12px",
              }}
              transition={{ duration: 0.8 }}
              mr={isOpen ? 4 : 0}
            >
              <MotionImage
                src="/images/logo.svg"
                alt="Logo"
                initial={false}
                animate={{
                  width: isOpen ? logoWidth : "40px",
                  height: isOpen ? logoHeight : "40px",
                }}
                transition={{ duration: 0.3 }}
              />
            </MotionBox>

            <Button
              onClick={toggleSidebar}
              bg="transparent"
              _hover={{ bg: "gray.700" }}
              p={2}
              mb={isOpen ? 0 : 6}
              alignSelf={isOpen ? "flex-start" : "center"}
            >
              <Image src={iconSrc} alt="Toggle Sidebar" boxSize="24px" />
            </Button>
          </MotionBox>

          {/* Navegación */}
          <VStack align="stretch" spacing={1}>
            {menuItems.map((item, index) => {
              const active = isActive(item.path);
              const styles = active ? activeStyles : ({} as Partial<typeof activeStyles>);
              const hover = active ? undefined : hoverStyles;
              const color = active ? activeStyles.color : defaultColor;

              return (
                <Button
                  key={index}
                  onClick={item.onClick}
                  height="80px"
                  w="100%"
                  variant="ghost"
                  px={0}
                  bg={styles?.bg ?? "transparent"}
                  color={color}
                  borderLeft={styles?.borderLeft ?? "none"}
                  borderBottom={styles?.borderBottom ?? "none"}
                  _hover={hover}
                  justifyContent="center"
                  borderRadius={0}
                >
                  {isOpen ? (
                    <HStack spacing="18px" pl={paddingLeft} w="100%" justify="flex-start">
                      <Image src={item.iconSrc} alt={item.label} boxSize={iconSize} />
                      <Text fontFamily="'Open Sans', sans-serif" fontWeight="semibold" fontSize={textSize}>
                        {item.label}
                      </Text>
                    </HStack>
                  ) : (
                    <Box display="flex" justifyContent="center" w="100%">
                      <Image src={item.iconSrc} alt={item.label} boxSize={iconSize} />
                    </Box>
                  )}
                </Button>
              );
            })}
          </VStack>
        </Box>

        {/* Cerrar sesión */}
        <Box marginTop="auto">
          <Button
            onClick={logoutItem.onClick}
            height="80px"
            w="100%"
            variant="ghost"
            px={0}
            bg="transparent"
            color={defaultColor}
            _hover={hoverStyles}
            justifyContent="center"
          >
            {isOpen ? (
              <HStack spacing="18px" pl={paddingLeft} w="100%" justify="flex-start">
                <Image src={logoutItem.iconSrc} alt="Cerrar sesión" boxSize={iconSize} />
                <Text fontFamily="'Open Sans', sans-serif" fontWeight="semibold" fontSize={textSize}>
                  {logoutItem.label}
                </Text>
              </HStack>
            ) : (
              <Box display="flex" justifyContent="center" w="100%">
                <Image src={logoutItem.iconSrc} alt="Cerrar sesión" boxSize={iconSize} />
              </Box>
            )}
          </Button>
        </Box>
      </Flex>
    </MotionBox>
  );
};
