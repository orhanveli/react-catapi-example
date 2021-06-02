import React from 'react';
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { LoginForm } from './LoginForm';

export function Login() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to upload new photos ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <LoginForm />
        </Box>
        <Box>
          <Text fontSize={'lg'} color={'gray.600'}>
            If you don't have an account please click{' '}
            <Link as={RouterLink} to="/sign-up" color={'blue.500'}>
              here for sing up
            </Link>
            .
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}
