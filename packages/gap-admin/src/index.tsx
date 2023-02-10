import React, { Suspense } from 'react';
import './utils/i18n';
import { createRoot } from 'react-dom/client';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import createThemeProvider from 'gap-common/src/themes';
import history from './utils/history';
import GlobalContainer from './containers/Global';
import store from './redux/store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const container = document.getElementById('root-admin') as HTMLElement;
const root = createRoot(container);

const ThemeProvider = createThemeProvider();

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
