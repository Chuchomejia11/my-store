import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useUserStatusGauge } from '@/hooks/useUserStatusGauge';

interface UserStatusGaugeProps {
  start?: string;
  end?: string;
}

export const UserStatusGauge: React.FC<UserStatusGaugeProps> = () => {
  const { data, loading, error } = useUserStatusGauge();
  const [showPercentage, setShowPercentage] = useState(true);

  if (loading) {
    return (
      <Box
        borderWidth="1px"
        borderRadius="md"
        p={6}
        w="100%"
        marginTop={'33px'}
        textAlign="center"
        bgColor={'white'}
        boxShadow="0px 20px 60px 0px rgba(86, 122, 176, 0.456)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="300px"
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        borderWidth="1px"
        borderRadius="md"
        p={6}
        w="100%"
        marginTop={'33px'}
        textAlign="center"
        bgColor={'white'}
        boxShadow="0px 20px 60px 0px rgba(86, 122, 176, 0.456)"
        height="300px"
      >
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Text fontSize="sm">{error}</Text>
        </Alert>
      </Box>
    );
  }

  const { total, completed } = data;
  const pending = total - completed;
  const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const pendingPercent = 100 - completedPercent;

  const radius = 80;
  const strokeWidth = 15;
  const center = radius + strokeWidth;
  const circumference = Math.PI * radius;
  const completedLength = (completedPercent / 100) * circumference;
  const pendingLength = circumference - completedLength + 5;

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={6}
      w="100%"
      marginTop={'33px'}
      textAlign="center"
      bgColor={'white'}
      boxShadow="0px 20px 60px 0px rgba(86, 122, 176, 0.456)"
    >
      <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize="xl" mb={4} fontWeight="bold" color={'#0D47A1'} textAlign={'left'}>
          Estado de registro de usuarios
        </Text>
        <Button
          mt={4}
          size="sm"
          onClick={() => setShowPercentage((prev) => !prev)}
          colorScheme="blue"
        >
          {showPercentage ? 'Cantidad' : 'Porcentaje'}
        </Button>
      </Flex>
      <Flex
        width="100%"
        justifyContent="space-evenly"
        alignItems="flex-start"
        gap={4}
        position={'relative'}
        height={`${radius + strokeWidth + 50}px`}
      >
        <Box textAlign="center" maxW={'70px'} position={'absolute'} left={0} top={'25%'}>
          <Text fontSize="md" fontWeight="bold" color="#2DD849">
            {showPercentage ? `${completedPercent}%` : `${completed} usuarios`}
          </Text>
        </Box>
        <Box
          width={`${2 * (radius + strokeWidth)}px`}
          height={`${radius + strokeWidth + 10}px`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <svg
            width={2 * (radius + strokeWidth)}
            height={radius + strokeWidth + 10}
            viewBox={`0 0 ${2 * (radius + strokeWidth)} ${radius + strokeWidth}`}
          >
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#2DD849"
              strokeWidth={strokeWidth}
              strokeDasharray={`${completedLength} ${circumference}`}
              strokeDashoffset={0}
              strokeLinecap="butt"
              transform={`rotate(180 ${center} ${center})`}
            />
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#F32F30"
              strokeWidth={strokeWidth}
              strokeDasharray={`${pendingLength} ${circumference}`}
              strokeDashoffset={-completedLength}
              strokeLinecap="butt"
              transform={`rotate(180 ${center} ${center})`}
            />
          </svg>
        </Box>
        <Box textAlign="center" maxW={'70px'} position={'absolute'} right={0} top={'25%'}>
          <Text fontSize="md" fontWeight="bold" color="#F32F30">
            {showPercentage ? `${pendingPercent}%` : `${pending} usuarios`}
          </Text>
        </Box>
        <Flex mt={4} justify="center" gap={1} flexDir={'column'} position={'absolute'} bottom={0} left={'auto'}>
          <Flex align="center" gap={2}>
            <Box w="14px" h="14px" bg="#2DD849" borderRadius="2px" />
            <Text>Completados</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Box w="14px" h="14px" bg="#F32F30" borderRadius="2px" />
            <Text>Pendientes</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};