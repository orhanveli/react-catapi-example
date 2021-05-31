import React from 'react';
import { Box, Grid, GridItem, HStack, Flex } from '@chakra-ui/react';
import { Switch, Route, Link } from 'react-router-dom';

import { WithSubnavigation } from './components/NavBar';
import { CatsHome } from './features/cats/CatsHome';
import { Login } from './features/auth/Login';
import { Register } from './features/auth/Register';

function App() {
  return (
    <div className="App">
      <WithSubnavigation />
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <CatsHome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
