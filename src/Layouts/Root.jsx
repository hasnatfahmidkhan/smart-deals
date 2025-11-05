import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import { useEffect } from "react";

const Root = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

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
