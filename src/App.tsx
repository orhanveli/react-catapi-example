import React from 'react';
import { Container } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';

import { WithSubnavigation } from './components/NavBar';
import { CatsHome } from './features/cats/CatsHome';
import { Upload } from './features/cats/Upload';
import { Login } from './features/auth/Login';
import { SignUp } from './features/auth/SignUp';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
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
