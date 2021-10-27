import { Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import AuthenticatedGuard from "./AuthenticatedGuard";

const Router = () => {
  return (
    <Switch>
      <AuthenticatedGuard>
        <Auth />
      </AuthenticatedGuard>
    </Switch>
  );
};

export default Router;
