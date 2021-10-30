import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../authContext';
const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return !user ? <Component {...routeProps} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PublicRoute;