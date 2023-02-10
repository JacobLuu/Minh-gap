/* eslint-disable global-require */
import { createRoot } from 'react-dom/client';
import React, { Suspense } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import Theme from './themes';
import history from './utils/history';
import GlobalContainer from './containers/Global';
import store from './redux/store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const container = document.getElementById('root-common');
const root = createRoot(container);

root.render(
  <Suspense fallback={loading()}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Theme>
          <GlobalContainer />
          <App />
        </Theme>
      </ConnectedRouter>
    </Provider>
  </Suspense>,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const AppContainer = require('./App').default;
    root.render(
      <Suspense fallback={loading()}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Theme>
              <GlobalContainer />
              <AppContainer />
            </Theme>
          </ConnectedRouter>
        </Provider>
      </Suspense>,
    );
  });
}
