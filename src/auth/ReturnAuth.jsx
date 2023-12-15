import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useCookies from "../hooks/useCookies";

function ReturnAuth() {
  const { getCookie } = useCookies("return_book");
  return getCookie() ? <Outlet /> : <Navigate to="/" />;
}

export default ReturnAuth;
