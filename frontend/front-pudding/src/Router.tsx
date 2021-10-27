import { Route, Switch, BrowserRouter } from "react-router-dom";
import Auth from "./Auth";
import { AuthProvider } from "./authContext";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Profile from "./page/Profile";
import Setting from "./page/Setting";
import EditProfile from "./page/EditProfile";
import FriendsList from "./page/FriendsList";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from './components/PublicRoute';

const Router = () => {
  return (
    <Switch>
      <AuthProvider>
        <BrowserRouter>
          {/* <Auth />
           */}
          <PrivateRoute exact path="/" component={Profile} />
          <PrivateRoute exact path="/setting" component={Setting} />
          <PrivateRoute exact path="/edit" component={EditProfile} />
          <PrivateRoute exact path="/friends" component={FriendsList} />
          <PublicRoute exact path="/" component={SignUp} />
          <PublicRoute path="/signin" exact component={SignIn} />
          <PublicRoute path="/signup" component={SignUp} />
        </BrowserRouter>
      </AuthProvider>
    </Switch>
  );
};

export default Router;
