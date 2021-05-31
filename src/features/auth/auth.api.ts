export async function loginRequest(username: string, pass: string) {
  if (!pass) {
    throw new Error('Password shold not be empty!');
  }
  return Promise.resolve({
    id: '3uer98wu983u9r8u3r3r',
    username,
    firstName: 'Orhan',
    lastName: 'Firik'
  });
}
