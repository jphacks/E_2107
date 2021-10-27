import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "./page/Profile";
import Setting from "./page/Setting";
import EditProfile from "./page/EditProfile";
import FriendsList from "./page/FriendsList";

const Auth = () => {
  return (
    <Switch>
      <Route exact path="/" component={Profile} />
      <Redirect
        path="/signin"
        to={{
          pathname: "/",
        }}
      />
      <Redirect
        path="/signup"
        to={{
          pathname: "/",
        }}
      />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/setting" component={Setting} />
      <Route exact path="/edit" component={EditProfile} />
      <Route exact path="/friends" component={FriendsList} />
    </Switch>
  );
};

export default Auth;
