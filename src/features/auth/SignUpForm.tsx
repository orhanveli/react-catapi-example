import {
  FormControl,
  FormLabel,
  Input,
  // Checkbox,
  Stack,
  FormErrorMessage,
  Button,
  Alert,
  AlertDescription
} from '@chakra-ui/react';
import {
  FormikHelpers,
  Formik,
  Form,
  Field,
  FormikState,
  FieldInputProps,
  useFormikContext
} from 'formik';

import { validateEmail, validatePass } from '../../utils/validation.utils';
import { selectAuth, signUpAsync } from './auth.slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export interface SignUpFormModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

type SignUpFormInputProps = {
  field: FieldInputProps<string>;
  form: FormikState<SignUpFormModel>;
};

interface SignUpFormProps {
  initialEmail?: string;
}

const InnerForm = () => {
  const { isSubmitting } = useFormikContext();
  const auth = useAppSelector(selectAuth);

  return (
    <Form>
      {auth.authError ? (
        <Alert status="error" mb={3}>
          <AlertDescription>{auth.authError}</AlertDescription>
        </Alert>
      ) : (
        ''
      )}
      <Stack spacing={4}>
        <Field name="email" validate={validateEmail}>
          {({ field, form }: SignUpFormInputProps) => (
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
          {({ field, form }: SignUpFormInputProps) => (
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
        <Field name="firstName" validate={validatePass}>
          {({ field, form }: SignUpFormInputProps) => (
            <FormControl
              isRequired
              isInvalid={!!form.errors.firstName && form.touched.firstName}
            >
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                {...field}
                id="firstName"
                placeholder="First name"
                type="text"
              />
              <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="lastName" validate={validatePass}>
          {({ field, form }: SignUpFormInputProps) => (
            <FormControl
              isRequired
              isInvalid={!!form.errors.lastName && form.touched.lastName}
            >
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                {...field}
                id="lastName"
                placeholder="last name"
                type="text"
              />
              <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Stack spacing={10}>
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
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export function SignUpForm(props: SignUpFormProps) {
  const dispatch = useAppDispatch();

  const initialValues = {
    email: props.initialEmail || '',
    password: '',
    firstName: '',
    lastName: ''
  };

  const handleSubmit = async (
    values: SignUpFormModel,
    { setSubmitting }: FormikHelpers<SignUpFormModel>
  ) => {
    setSubmitting(true);
    await dispatch(signUpAsync(values));
    setSubmitting(false);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <InnerForm />
    </Formik>
  );
}
