import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const RequireAuth = () => {
  //   const location = useLocation();
  const { checkValidUser } = useAuth();

  return checkValidUser() ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
