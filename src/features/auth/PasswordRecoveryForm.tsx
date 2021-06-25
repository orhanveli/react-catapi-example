import {
  Box,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
  Button,
  Alert,
  AlertDescription
} from '@chakra-ui/react';
import {
  Formik,
  FormikHelpers,
  Form,
  Field,
  FormikState,
  FieldInputProps,
  useFormikContext
} from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import { validateEmail } from '../../utils/validation.utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { recoverPasswordAsync, selectAuth } from './auth.slice';
import { useState } from 'react';

interface PasswordRecoveryFormModel {
  email: string;
}

interface PasswordRecoveryFormProps {
  initialEmail?: string;
}

type PasswordRecoveryFormInputProps = {
  field: FieldInputProps<string>;
  form: FormikState<PasswordRecoveryFormModel>;
};

const InnerForm = () => {
  const authState = useAppSelector(selectAuth);
  const { isSubmitting } = useFormikContext<PasswordRecoveryFormModel>();

  return (
    <Form>
      {authState.authError ? (
        <Alert status="error" mb={3}>
          <AlertDescription>{authState.authError}</AlertDescription>
        </Alert>
      ) : (
        ''
      )}
      <Stack spacing={4}>
        <Field name="email" type="email" validate={validateEmail}>
          {({ field, form }: PasswordRecoveryFormInputProps) => (
            <FormControl
              isRequired
              isInvalid={!!form.errors.email && form.touched.email}
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input {...field} id="email" placeholder="Email" />
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
            Send recover e-mail
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export const PasswordRecoveryForm = (props: PasswordRecoveryFormProps) => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [success, setSuccess] = useState(false);

  const initialValues = {
    email: props.initialEmail ?? ''
  };

  const handleSubmit = async (
    values: PasswordRecoveryFormModel,
    { setSubmitting }: FormikHelpers<PasswordRecoveryFormModel>
  ) => {
    setSubmitting(true);
    await dispatch(recoverPasswordAsync(values.email));
    if (!auth.authError) {
      setSuccess(true);
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <>
        <Alert status="success" mb={3}>
          <AlertDescription>
            Your password recovery email has been sent, please check your inbox.
          </AlertDescription>
        </Alert>
        <Box mt={3}>
          <Text fontSize={'lg'} color={'gray.600'}>
            Go to{' '}
            <Link as={RouterLink} to="/" color={'blue.500'}>
              Home page
            </Link>
            .
          </Text>
        </Box>
      </>
    );
  }

  return (
    <>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <InnerForm />
      </Formik>
    </>
  );
};
