import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { signOutAsync } from './auth.slice';

export function SignOut() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(signOutAsync());
  }, []);

  return (
    <Redirect
      to={{
        pathname: '/'
      }}
    />
  );
}
