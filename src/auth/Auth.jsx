import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useCookies from "../hooks/useCookies";

function Auth() {
  const { getCookie } = useCookies("token");
  return getCookie() ? <Outlet /> : <Navigate to="/" />;
}

export default Auth;
