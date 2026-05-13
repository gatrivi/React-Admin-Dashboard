import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiShoppingBag, FiUsers, FiGrid, FiMoreHorizontal } from "react-icons/fi";

const tabs = [
  { path: "/", label: "Inicio", icon: FiHome },
  { path: "/pedidos", label: "Pedidos", icon: FiShoppingBag },
  { path: "/clientes", label: "Clientes", icon: FiUsers },
  { path: "/productos", label: "Productos", icon: FiGrid },
  { path: "/mas", label: "Más", icon: FiMoreHorizontal },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-secondary-dark-bg border-t border-gray-100 dark:border-gray-700 z-50 md:hidden safe-area-pb">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-400 dark:text-gray-500"
              }`
            }
          >
            <tab.icon size={22} strokeWidth={2} />
            <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
