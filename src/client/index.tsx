import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CssBaseline } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider as ReduxProvider } from 'react-redux';

import getClient from '@client/apollo/index';
import regSW from './registerServiceWorker';
import store from './store';
import App from './App';

regSW();

(async () => {
  const [client] = await getClient();

  ReactDOM.render(
    (
      <ReduxProvider store={store}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <App />
        </ApolloProvider>
      </ReduxProvider>
    ),
    document.getElementById('app'),
  );
})();
