import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const CustomerCard = ({ customer }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/cliente/${customer.id}`)}
      className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99] flex items-center gap-3"
    >
      <img
        src={customer.avatar}
        alt={customer.name}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
            {customer.name}
          </p>
          <StatusBadge status={customer.status} type="customer" />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
          {customer.phone}
        </p>
        <div className="flex gap-3 mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {customer.ordersCount}
            </span>{" "}
            pedidos
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              ${customer.totalSpent.toLocaleString("es-MX", { minimumFractionDigits: 0 })}
            </span>{" "}
            total
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
