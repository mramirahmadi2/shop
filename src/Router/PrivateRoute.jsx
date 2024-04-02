import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userLoggedIn = localStorage.getItem("loginTime");
  
  if (!userLoggedIn) {
    alert("لطفا فرم ورود را وارد کنید");
    return <Navigate to="/Login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
