import ThemeChange from "components/ThemeChange";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const  navigate = useNavigate();
  return (
    <div className="w-[100vw] fixed h-auto bg-white z-50">
      <div className="max-w-[85rem] mx-auto flex flex-col border-b-2 mt-4 pb-4 ">
        <div className="flex flex-row  item-center justify-between ">
          <div className="cursor-pointer flex flex-row items-center mr-4">
            <Link to={"/"}>
              <h3>لوگو</h3>
            </Link>
            <div>
               <ThemeChange/>
            </div>
          </div>
          <div className="flex flex-row items-center ml-4">
            <div>
              <span className="text-[14px] ml-[16px] text-[#3e7bfa] cursor-pointer hover:">
                حساب کاربری
              </span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-4 px-4 rounded-full" onClick={()=>{navigate("/Advertising")}}>
                ثبت آگهی رایگان
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
