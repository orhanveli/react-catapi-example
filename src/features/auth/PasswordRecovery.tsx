import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';

import { PasswordRecoveryForm } from './PasswordRecoveryForm';

export const PasswordRecovery = () => (
  <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}
  >
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Password Recovery</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          enter your e-mail address to recover your password
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <PasswordRecoveryForm />
      </Box>
    </Stack>
  </Flex>
);
