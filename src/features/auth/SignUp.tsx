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

import { SignUpForm } from './SignUpForm';

export function SignUp() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up for new account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <SignUpForm />
        </Box>
        <Box>
          <Text fontSize={'lg'} color={'gray.600'}>
            If you already registered{' '}
            <Link as={RouterLink} to="/login" color={'blue.500'}>
              here for ligin
            </Link>
            .
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}
