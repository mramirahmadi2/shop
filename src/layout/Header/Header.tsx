import { ThemeContext } from "ThemeContext";
import ThemeChange from "components/ThemeChange";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { theme }: any = useContext(ThemeContext);
  return (
    <div
      className={`w-[100vw] fixed h-auto z-50 ${
        theme === "dark" ? "bg-gray-900 text-white " : "bg-white text-black"
      } `}
    >
      <div
        className={`max-w-[85rem] mx-auto flex flex-col ${
          theme === "dark" ? "border-white " : "border-black"
        } border-b-2 mt-4 pb-4 `}
      >
        <div className="flex flex-row  item-center justify-between ">
          <div className="cursor-pointer flex flex-row items-center mr-4">
            <Link to={"/"}>
              <h3>لوگو</h3>
            </Link>
            <div>
              <ThemeChange />
            </div>
          </div>
          <div className="flex flex-row items-center ml-4">
            <div>
              <Link to="/sinup">
                <span className={`text-[14px] ml-[16px] ${
        theme === "dark" ? "text-blue-400" : "text-[#3e7bfa]"
      }   cursor-pointer`}>
                  ایجاد حساب کاربری
                </span>
              </Link>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-4 px-4 rounded-full"
              onClick={() => {
                navigate("/Advertising");
              }}
            >
              ثبت آگهی رایگان
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
