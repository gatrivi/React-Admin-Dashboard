import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../data/avatar.jpg";
import { useStateContext } from "../context/ContextProvider";

const Navbar = () => {
  const { setActiveMenu, screenSize, setScreenSize, currentColor } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  return (
    <div className="flex justify-between items-center p-3 md:mx-6 relative bg-main-bg dark:bg-main-dark-bg">
      <button
        type="button"
        onClick={() => setActiveMenu((prev) => !prev)}
        style={{ color: currentColor }}
        className="text-xl rounded-full p-2 hover:bg-light-gray md:block hidden"
      >
        <AiOutlineMenu />
      </button>

      <div className="flex items-center gap-2 md:hidden">
        <span className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">
          AdminPYME
        </span>
        <span className="text-[9px] bg-blue-500 text-white py-0.5 px-1.5 rounded-full font-bold">
          DEMO
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg transition-all duration-300">
          <img src={avatar} alt="profile-pic" className="rounded-full h-8 w-8" />
          <span className="text-gray-400 font-bold text-sm hidden sm:inline">
            Admin
          </span>
          <MdKeyboardArrowDown className="text-gray-400 text-sm hidden sm:inline" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
