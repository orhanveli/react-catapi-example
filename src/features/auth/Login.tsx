import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  FormErrorMessage,
  Button,
  Heading,
  Text,
  Alert,
  AlertDescription,
  useColorModeValue
} from '@chakra-ui/react';
import {
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  withFormik,
  FormikState,
  FieldInputProps
} from 'formik';
import firebase from 'firebase';

interface LoginFormModel {
  email: string;
  password: string;
  serverError?: string;
}

type LoginFormInputProps = {
  field: FieldInputProps<string>;
  form: FormikState<LoginFormModel>;
};

const validateEmail = (val: string) => {
  let error;
  if (!val) {
    error = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val)) {
    error = 'Invalid email address';
  }
  return error;
};

const validatePass = (val: string) => {
  if (!val) {
    return 'Password is required';
  }
  return false;
};

const InnerForm = (props: FormikProps<LoginFormModel>) => {
  const { isSubmitting, isValid, errors } = props;

  return (
    <Form>
      {!isValid && errors.serverError ? (
        <Alert status="error" mb={3}>
          <AlertDescription>{errors.serverError}</AlertDescription>
        </Alert>
      ) : (
        ''
      )}
      <Stack spacing={4}>
        <Field name="email" validate={validateEmail}>
          {({ field, form }: LoginFormInputProps) => (
            <FormControl
              isRequired
              isInvalid={!!form.errors.email && form.touched.email}
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input {...field} id="email" placeholder="email" type="email" />
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="password" validate={validatePass}>
          {({ field, form }: LoginFormInputProps) => (
            <FormControl
              isRequired
              isInvalid={!!form.errors.password && form.touched.password}
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                {...field}
                id="password"
                placeholder="password"
                type="password"
              />
              <FormErrorMessage>{form.errors.password}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Stack spacing={10}>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}
          >
            <Checkbox>Remember me</Checkbox>
            {/* <Link color={'blue.400'}>Forgot password?</Link> */}
          </Stack>
          <Button
            type="submit"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500'
            }}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

interface MyFormProps {
  initialEmail?: string;
}

// Wrap our form with the withFormik HoC
const LoginForm = withFormik<MyFormProps, LoginFormModel>({
  mapPropsToValues: (props) => ({
    email: props.initialEmail || '',
    password: '',
    serverError: undefined
  }),

  handleSubmit: async (
    values: LoginFormModel,
    { setSubmitting, setFieldError }: FormikHelpers<LoginFormModel>
  ) => {
    setSubmitting(true);
    try {
      const loginResult = await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
      // eslint-disable-next-line no-console
      console.log(loginResult);
    } catch (error) {
      setFieldError('serverError', error.message);
    }
    setSubmitting(false);
  }
})(InnerForm);

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
      </Stack>
    </Flex>
  );
}
