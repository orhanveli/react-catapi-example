import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/auth.slice';

export type OmitNative<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]: T[P];
};

export function PrivateRoute<
  T extends Record<string, unknown> = Record<string, unknown>,
  Path extends string = string
>({
  children,
  ...rest
}: React.PropsWithChildren<
  RouteProps<Path> & OmitNative<T, keyof RouteProps>
>) {
  const user = useAppSelector(selectCurrentUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
