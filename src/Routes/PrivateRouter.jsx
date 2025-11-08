import React, { use } from "react";
import AuthContext from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <>loading</>;
  }
  if (user && user.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
  }
};

export default PrivateRouter;
