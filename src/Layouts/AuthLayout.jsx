import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

const AuthLayout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
