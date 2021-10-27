import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "./page/Profile";
import Setting from "./page/Setting";
import EditProfile from "./page/EditProfile";
import FriendsList from "./page/FriendsList";
import { useAuthContext } from './authContext';
import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";

const Auth = () => {
  // const { user } = useAuthContext();
  // const path = window.location.pathname;
  // const uid = path.split("/profile/")[1];
  // console.log(uid);
  return (
    <Switch>
    </Switch>
  );
};

export default Auth;
