export const validateNotEmpty = (
  val: string,
  message = 'Required, please provide a proper value.'
) => {
  if (!val) {
    return message;
  }
  return false;
};

export const validateEmail = (val: string) => {
  let error;
  if (!val) {
    error = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val)) {
    error = 'Invalid email address';
  }
  return error;
};

export const validatePass = (val: string) =>
  validateNotEmpty(val, 'Password is required');
