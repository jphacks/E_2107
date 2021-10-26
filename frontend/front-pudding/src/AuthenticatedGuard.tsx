import { useAuth } from "./store/useAuth";
import React, { FC } from "react";
import { Redirect, useLocation } from "react-router-dom";

const AuthenticatedGuard: FC = ({ children }) => {
  const isAuthenticated = useAuth(); // ログイン済みかどうかのフラグ
  const location = useLocation();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

export default AuthenticatedGuard;
