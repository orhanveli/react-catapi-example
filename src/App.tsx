import React, { useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';
import firebase from 'firebase';

import { WithSubnavigation } from './components/NavBar';
import { PrivateRoute } from './components/PrivateRoute';
import { useAppDispatch } from './app/hooks';
import { setCurrentUser } from './features/auth/auth.slice';
import { auth } from './utils/firestore.utils';

import { CatsHome } from './features/cats/CatsHome';
import { Upload } from './features/cats/Upload';
import { Login } from './features/auth/Login';
import { SignUp } from './features/auth/SignUp';
import { SignOut } from './features/auth/SingOut';
import { PasswordRecovery } from './features/auth/PasswordRecovery';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((usr) => {
      dispatch(setCurrentUser(usr ? (usr.toJSON() as firebase.User) : null));
    });
    return () => {
      unsubscriber();
    };
  }, []);

  return (
    <div className="App">
      <Container maxW="container.xl">
        <WithSubnavigation />
        <Switch>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/password-recovery">
            <PasswordRecovery />
          </Route>
          <Route path="/sign-out">
            <SignOut />
          </Route>
          <PrivateRoute path="/upload">
            <Upload />
          </PrivateRoute>
          <Route path="/">
            <CatsHome />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
