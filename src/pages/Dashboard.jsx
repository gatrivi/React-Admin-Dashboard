import React from "react";
import { useNavigate } from "react-router-dom";
import { dashboardStats, ordersData } from "../data/pymeData";
import OrderCard from "../components/OrderCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const recentOrders = ordersData.slice(0, 5);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          ¡Hola, Admin!
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Aquí está el resumen de hoy
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {dashboardStats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}
            >
              {stat.icon}
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Pedidos Recientes
          </h2>
          <button
            onClick={() => navigate("/pedidos")}
            className="text-sm text-blue-500 font-medium hover:underline"
          >
            Ver todos
          </button>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
