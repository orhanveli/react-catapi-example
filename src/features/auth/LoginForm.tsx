import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
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
import { Redirect } from 'react-router-dom';

import { validateEmail, validatePass } from '../../utils/validation.utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginAsync, selectAuth, selectCurrentUser } from './auth.slice';

interface LoginFormModel {
  email: string;
  password: string;
  serverError?: string;
}

interface LoginFormProps {
  initialEmail?: string;
}

type LoginFormInputProps = {
  field: FieldInputProps<string>;
  form: FormikState<LoginFormModel>;
};

const InnerForm = (props: LoginFormProps) => {
  const authState = useAppSelector(selectAuth);
  const { isSubmitting } = useFormikContext<LoginFormModel>();

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
          {({ field, form }: LoginFormInputProps) => (
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
                placeholder="Password"
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

export const LoginForm = (props: LoginFormProps) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const initialValues = {
    email: props.initialEmail ?? '',
    password: ''
  };

  const handleSubmit = async (
    values: LoginFormModel,
    { setSubmitting }: FormikHelpers<LoginFormModel>
  ) => {
    const credentials = { email: values.email, password: values.password };
    setSubmitting(true);
    await dispatch(loginAsync(credentials));
    setSubmitting(false);
  };

  // if (user) {
  //   setItem
  // }

  return (
    <>
      {user ? (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      ) : (
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          <InnerForm {...props} />
        </Formik>
      )}
    </>
  );
};

// export const LoginForm = connector(
//   withFormik<LoginFormProps, LoginFormModel>({
//     mapPropsToValues: (props) => ({
//       email: props.initialEmail ?? '',
//       password: ''
//     }),
//     async handleSubmit(values, { props, setSubmitting }) {
//       const { loginAsync } = props as PropsFromRedux;
//       const credentials = { email: values.email, password: values.password };
//       setSubmitting(true);
//       await loginAsync(credentials);
//       setSubmitting(false);
//     }
//   })(InnerForm)
// );
