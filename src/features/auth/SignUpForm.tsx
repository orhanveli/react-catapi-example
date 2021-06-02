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
  FormikProps,
  Form,
  Field,
  withFormik,
  FormikState,
  FieldInputProps
} from 'formik';

import { validateEmail, validatePass } from '../../utils/validation.utils';
import {
  dbCollections,
  db,
  auth,
  findUserDocumentByEmail,
  updateUserIfExists
} from '../../utils/firestore.utils';
import { CatUser } from './auth.slice';

export interface SignUpFormModel {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  serverError?: string;
}

type SignUpFormInputProps = {
  field: FieldInputProps<string>;
  form: FormikState<SignUpFormModel>;
};

const InnerForm = (props: FormikProps<SignUpFormModel>) => {
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

interface SignUpFormProps {
  initialEmail?: string;
}

export const SignUpForm = withFormik<SignUpFormProps, SignUpFormModel>({
  mapPropsToValues: (props) => ({
    email: props.initialEmail || '',
    password: '',
    firstName: '',
    lastName: '',
    serverError: undefined
  }),

  handleSubmit: async (
    values: SignUpFormModel,
    { setSubmitting, setFieldError }: FormikHelpers<SignUpFormModel>
  ) => {
    setSubmitting(true);
    try {
      const signUpResult = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      // eslint-disable-next-line no-console
      console.log(signUpResult);
      if (signUpResult.user) {
        const isExists = await findUserDocumentByEmail(values.email);
        const newUser: Partial<CatUser> = {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName
        };
        if (isExists) {
          const updated = await updateUserIfExists(newUser);
          if (updated) {
            newUser.id = isExists.id;
          }
        } else {
          const createUserResult = await db
            .collection(dbCollections.users)
            .add(newUser);
          // eslint-disable-next-line no-console
          console.log({ createUserResult });
          if (createUserResult.id) {
            newUser.id = createUserResult.id;
          }
        }
      }
    } catch (error) {
      setFieldError('serverError', error.message);
    }
    setSubmitting(false);
  }
})(InnerForm);
