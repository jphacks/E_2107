import { useAuth } from "./store/useAuth";
import { FC } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";

const AuthenticatedGuard: FC = ({ children }) => {
  const isAuthenticated : boolean= useAuth(); // ログイン済みかどうかのフラグ
  const location = useLocation();


  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Switch>
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
    <Redirect
      to={{
        pathname: "/signup",
        state: { from: location },
      }}
    />
    </Switch>
  );
};

export default AuthenticatedGuard;
