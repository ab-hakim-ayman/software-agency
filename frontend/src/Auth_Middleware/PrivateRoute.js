import React from "react";
import { Outlet } from "react-router-dom";


function Previous() {
  window.history.back()
}

const PrivateRoute = () => {
  const user = localStorage.getItem("DTCUserToken");
  return user ? <Outlet /> : Previous();
};

export const AdminPrivateRoute = () => {
  const user = localStorage.getItem("DTCAdminToken");
  return user ? <Outlet /> : Previous();
};

export default PrivateRoute;
