import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import path from './constants/clientPath';
import LoginPage from './containers/Login';
import ProtectedRoute from './components/ProtectedRoute';
import DefaultSidebar from './components/DefaultSidebar';
import history from './utils/history';

function App() {
  const s3ConfigPath = (/#!(\/.*)$/.exec(history.location.hash) || [])[1];
  if (s3ConfigPath) {
    history.replace(s3ConfigPath);
  }
  return (
    <HashRouter>
      <Switch>
        {/**
         * PUBLIC PATHS
         *  */}
        <Route exact path={path.LOGIN} component={LoginPage} />
        {/**
         * PROTECTED PATHS
         */}
        <ProtectedRoute path={path.ROOT} component={DefaultSidebar} />
      </Switch>
    </HashRouter>
  );
}

export default App;
