import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

const HomeLayout = () => {
  return (
    <div className="max-w-[1280px] m-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default HomeLayout;
