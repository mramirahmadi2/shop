import React, { useContext } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const Layout = () => {
  const { theme }: any = useContext(ThemeContext); 
console.log(theme);
  return (
    <div className={`flex flex-col min-h-screen justify-between 
    ${theme === "dark" ? "bg-gray-900 text-white ": "bg-white text-black"} 
    `}>
      <Header />
      <main className="max-w-7xl  mx-auto mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
