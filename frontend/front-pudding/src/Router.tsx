import { Route, Switch } from 'react-router-dom';
import { VFC } from 'react';
import SignIn from './page/SignIn';
import Auth from './Auth';
import AuthenticatedGuard from './AuthenticatedGuard';

const Router: VFC = () => {
  return (
    <Switch>
      <Route path="/signin" exact component={SignIn} />
	  <AuthenticatedGuard>
      <Auth />
	  </AuthenticatedGuard>
    </Switch>
  );
};

export default Router({});