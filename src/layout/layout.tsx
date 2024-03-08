import React, { ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col  h-screen justify-between">
      <Header />
      <main className="max-w-7xl mx-auto  mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
