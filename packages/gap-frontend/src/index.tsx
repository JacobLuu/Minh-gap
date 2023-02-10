import 'react-toastify/dist/ReactToastify.css';
import './utils/i18n';

import { ConnectedRouter } from 'connected-react-router';
import createThemeProvider from 'gap-common/src/themes';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';

import App from './App';
import GlobalContainer from './containers/Global';
import store from './redux/store';
import overrideTheme from './themes';
import history from './utils/history';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const container = document.getElementById('root-frontend');
const root = createRoot(container);

const ThemeProvider = createThemeProvider(overrideTheme);

root.render(
  <Suspense fallback={loading()}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider>
          <CookiesProvider>
            <CssBaseline />
            <GlobalContainer />
            <App />
          </CookiesProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </Suspense>,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const App = require('./App').default;
    root.render(
      <Suspense fallback={loading()}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ThemeProvider>
              <CssBaseline />
              <GlobalContainer />
              <App />
            </ThemeProvider>
          </ConnectedRouter>
        </Provider>
      </Suspense>,
    );
  });
}
