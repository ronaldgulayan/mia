import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useCookies from "../hooks/useCookies";

function OneWayAuth() {
  const { getCookie } = useCookies("oneway_book");
  return getCookie() ? <Outlet /> : <Navigate to="/" />;
}

export default OneWayAuth;
