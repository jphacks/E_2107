import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../authContext';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return user ? <Component {...routeProps} /> : <Redirect to="/signin" />;
      }}
    />
  );
};

export default PrivateRoute;