import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-base-200">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
