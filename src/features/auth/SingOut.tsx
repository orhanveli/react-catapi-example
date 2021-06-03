import React, { useEffect } from 'react';
import { Center } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { signOutAsync } from './auth.slice';

export function SignOut() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  function delayAndGo() {
    setTimeout(() => history.push('/'), 2000);
  }

  useEffect(() => {
    dispatch(signOutAsync());
    delayAndGo();
  }, []);

  return (
    <Center h="100%" height="60vh">
      You've signed-out, please wait...
    </Center>
  );
}
