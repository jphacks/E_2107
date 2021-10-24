import { Route, Switch } from 'react-router-dom';
import { VFC } from 'react';
import Profile from './page/Profile';
import Setting from './page/Setting';

const Auth: VFC = () => {
  return (
    <Switch>
      <Route path="/profile" exact component={Profile} />
      <Route path="/setting" exact component={Setting} />
    </Switch>
  );
};

export default Auth;