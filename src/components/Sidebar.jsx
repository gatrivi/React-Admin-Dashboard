import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiGrid,
  FiMoreHorizontal,
} from "react-icons/fi";
import { useStateContext } from "../context/ContextProvider";

const links = [
  { title: "Principal", links: [
    { name: "Inicio", path: "/", icon: <FiHome /> },
    { name: "Pedidos", path: "/pedidos", icon: <FiShoppingBag /> },
    { name: "Clientes", path: "/clientes", icon: <FiUsers /> },
    { name: "Productos", path: "/productos", icon: <FiGrid /> },
    { name: "Más", path: "/mas", icon: <FiMoreHorizontal /> },
  ]},
];

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware className="text-3xl" />
              <span>AdminPYME</span>
              <span className="text-[10px] bg-blue-500 text-white py-0.5 px-2 rounded-full font-bold">
                DEMO
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu((prev) => !prev)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase text-xs font-semibold tracking-wider">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={link.path}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
