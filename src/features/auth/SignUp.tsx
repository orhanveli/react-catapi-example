import React, { useEffect } from 'react';
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { SignUpForm } from './SignUpForm';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from './auth.slice';

export function SignUp() {
  const user = useAppSelector(selectCurrentUser);
  const history = useHistory();

  const wrapperBgColor = useColorModeValue('gray.50', 'gray.800');
  const bgColor = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={wrapperBgColor}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up for new account</Heading>
        </Stack>
        <Box rounded={'lg'} bg={bgColor} boxShadow={'lg'} p={8}>
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
