import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import path from './constants/clientPath';
import CreateAccount from './containers/CreateAccount';
import ForgotPassword from './containers/ForgotPassword';
import GetStartedPage from './containers/GetStarted/Loadable';
import Login from './containers/Login';
import Profile from './containers/Profile';
import RegistrationJourney from './containers/RegistrationJourney';
import ResetPassword from './containers/ResetPassword';
import Welcome from './containers/Welcome';
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
        <Route exact path={path.ROOT} component={Welcome} />
        <Route exact path={path.WELCOME} component={Welcome} />
        <Route exact path={path.LOGIN} component={Login} />
        <Route exact path={path.CREATE_ACCOUNT} component={CreateAccount} />
        <Route exact path={path.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={path.RESET_PASSWORD} component={ResetPassword} />
        {/**
         * FIXME: move to protected route later
         */}
        <ProtectedRoute path={path.GETSTARTED} component={GetStartedPage} />
        <ProtectedRoute
          path={path.REGISTRATION_JOURNEY}
          component={RegistrationJourney}
        />
        <ProtectedRoute path={path.PROFILE} component={Profile} />
        {/**
         * PROTECTED PATHS
         */}
      </Switch>
    </HashRouter>
  );
}

export default App;
