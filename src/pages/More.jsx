import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMoon,
  FiSun,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiChevronRight,
  FiTrello,
  FiCalendar,
  FiEdit3,
  FiPieChart,
  FiBarChart2,
  FiUsers,
  FiShoppingBag,
} from "react-icons/fi";
import { useStateContext } from "../context/ContextProvider";

const More = () => {
  const navigate = useNavigate();
  const { currentMode, setMode } = useStateContext();

  const enterpriseTools = [
    { icon: FiTrello, label: "Kanban (Tareas)", path: "/kanban", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: FiCalendar, label: "Calendario", path: "/calendario", color: "text-green-500", bg: "bg-green-50" },
    { icon: FiEdit3, label: "Editor de Texto", path: "/editor", color: "text-amber-500", bg: "bg-amber-50" },
    { icon: FiUsers, label: "Gestión de Personal", path: "/empleados", color: "text-purple-500", bg: "bg-purple-50" },
    { icon: FiShoppingBag, label: "E-commerce Extendido", path: "/ecommerce", color: "text-pink-500", bg: "bg-pink-50" },
  ];

  const chartTools = [
    { icon: FiBarChart2, label: "Análisis de Líneas", path: "/line" },
    { icon: FiPieChart, label: "Distribución (Pie)", path: "/pie" },
    { icon: FiBarChart2, label: "Barras y Columnas", path: "/bar" },
    { icon: FiBarChart2, label: "Gráficos de Área", path: "/area" },
  ];

  const settingsMenu = [
    { icon: FiSettings, label: "Configuración", action: () => alert("Configuración") },
    { icon: FiHelpCircle, label: "Ayuda y soporte", action: () => alert("Ayuda") },
    { icon: FiLogOut, label: "Cerrar sesión", action: () => alert("Cerrar sesión"), danger: true },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Más opciones
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Configuración y herramientas avanzadas
        </p>
      </div>

      {/* Theme Toggle */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              {currentMode === "Dark" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Tema
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentMode === "Dark" ? "Oscuro" : "Claro"}
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              setMode({ target: { value: currentMode === "Dark" ? "Light" : "Dark" } })
            }
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                currentMode === "Dark" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Enterprise Tools */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-1">
          Herramientas Enterprise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {enterpriseTools.map((tool) => (
            <button
              key={tool.label}
              onClick={() => navigate(tool.path)}
              className="flex items-center justify-between p-4 bg-white dark:bg-secondary-dark-bg rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${tool.bg} dark:bg-gray-800 flex items-center justify-center ${tool.color}`}>
                  <tool.icon size={20} />
                </div>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {tool.label}
                </span>
              </div>
              <FiChevronRight size={16} className="text-gray-300 dark:text-gray-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Analytics */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-1">
          Análisis y Reportes
        </h2>
        <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {chartTools.map((chart, idx) => (
            <button
              key={chart.label}
              onClick={() => navigate(chart.path)}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                idx !== chartTools.length - 1
                  ? "border-b border-gray-50 dark:border-gray-700"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <chart.icon size={18} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {chart.label}
                </span>
              </div>
              <FiChevronRight size={16} className="text-gray-300 dark:text-gray-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Settings Menu */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {settingsMenu.map((item, idx) => (
          <button
            key={item.label}
            onClick={item.action}
            className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
              idx !== settingsMenu.length - 1
                ? "border-b border-gray-50 dark:border-gray-700"
                : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon
                size={20}
                className={
                  item.danger
                    ? "text-red-500"
                    : "text-gray-500 dark:text-gray-400"
                }
              />
              <span
                className={`text-sm font-medium ${
                  item.danger
                    ? "text-red-500"
                    : "text-gray-800 dark:text-gray-100"
                }`}
              >
                {item.label}
              </span>
            </div>
            <FiChevronRight
              size={16}
              className={
                item.danger ? "text-red-300" : "text-gray-300 dark:text-gray-600"
              }
            />
          </button>
        ))}
      </div>

      {/* App Info */}
      <div className="text-center pt-2">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          AdminPYME Pro — Módulo Enterprise Activo
        </p>
      </div>
    </div>
  );
};

export default More;
