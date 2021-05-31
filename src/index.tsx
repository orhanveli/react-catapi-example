import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAbPD7B0vrP99CSXOeLMbzB3bxbtDNi2PY',
  authDomain: 'catsapi-react-demonstration.firebaseapp.com',
  projectId: 'catsapi-react-demonstration',
  storageBucket: 'catsapi-react-demonstration.appspot.com',
  messagingSenderId: '589018570976',
  appId: '1:589018570976:web:ce712173d2b0f8a822f085'
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
