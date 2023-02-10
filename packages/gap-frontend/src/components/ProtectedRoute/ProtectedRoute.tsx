import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CACHED_URL } from '../../constants/localStorage';
import path from '../../constants/clientPath';
import {
  isHavingToken,
  getCachedUrl,
  updateCachedUrl,
} from '../../utils/localStorage';

type IRouteProps = {
  component: FC;
  location?: {
    pathname: string;
    search: string;
  };
  path: string;
};

const ProtectedRoute = ({
  component: Component,
  location,
  ...rest
}: IRouteProps) => {
  const isLoggedIn = isHavingToken();
  /**
   *  Navigate to desired path after logging in
   */
  if (!isLoggedIn) {
    updateCachedUrl(`${location.pathname}${location.search}`);
  }

  const cachedUrl = getCachedUrl();

  return (
    <Route
      {...rest}
      render={(props: undefined) => {
        /**
         *  For common navigation in app
         */
        if (isLoggedIn && !cachedUrl) {
          return <Component {...props} />;
        }
        /**
         *  For navigation to cached path RIGHT after logging in
         */
        if (isLoggedIn && cachedUrl) {
          // remove the cached path (if it exists) after achieve it for navigating purpose
          localStorage.removeItem(CACHED_URL);
          return <Redirect to={{ pathname: cachedUrl }} />;
        }
        /**
         *  If not logined yet
         */
        return (
          <Redirect
            to={{
              pathname: path.LOGIN,
            }}
          />
        );
      }}
    />
  );
};

ProtectedRoute.defaultProps = {
  location: {
    pathname: '/',
  },
};

export default ProtectedRoute;
