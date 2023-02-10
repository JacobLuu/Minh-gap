import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import CLIENT_PATH from './constants/clientPath';
import LoginPage from './containers/Login/loadable';
import ForgotPassword from './containers/ForgotPassword/loadable';
import ResetPassword from './containers/ResetPassword/loadable';
import EditingTemplate from './containers/EmailTemplates/EditingTemplate/Loadable';
import ProtectedRoute from './components/ProtectedRoute';
import DefaultSidebar from './components/DefaultSidebar';
import history from './utils/history';
import '@fontsource/poppins';
import EscalatedIssues from './containers/EscalatedIssues/Loadable';
import Branches from './containers/Branches/Loadable';
import BranchCandidates from './containers/BranchCandidates/Loadable';
import Candidates from './containers/Candidates/Loadable';
import BranchDetail from './containers/Branches/BranchDetail/Loadable';

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
        <Route exact path={CLIENT_PATH.LOGIN} component={LoginPage} />
        <Route
          exact
          path={CLIENT_PATH.FORGOT_PASSWORD}
          component={ForgotPassword}
        />
        <Route
          exact
          path={CLIENT_PATH.RESET_PASSWORD}
          component={ResetPassword}
        />

        {/**
         * PROTECTED PATHS
         */}
        <ProtectedRoute path={CLIENT_PATH.ROOT} component={DefaultSidebar} />
        <ProtectedRoute
          path={CLIENT_PATH.EMAIL_TEMPLATE}
          component={EditingTemplate}
        />
        <ProtectedRoute
          path={CLIENT_PATH.ESCALATED_ISSUES}
          component={EscalatedIssues}
        />
        <ProtectedRoute path={CLIENT_PATH.BRANCHES} component={Branches} />
        <ProtectedRoute
          path={CLIENT_PATH.BRANCHES_NEW}
          component={BranchDetail}
        />
        <ProtectedRoute path={CLIENT_PATH.CANDIDATES} component={Candidates} />
        <ProtectedRoute
          path={CLIENT_PATH.BRANCH_CANDIDATES}
          component={BranchCandidates}
        />
      </Switch>
    </HashRouter>
  );
}

export default App;
