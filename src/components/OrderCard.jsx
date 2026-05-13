import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/pedido/${order.id}`)}
      className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-xs text-gray-400 font-medium">{order.id}</p>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-0.5">
            {order.customerName}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {order.date} · {order.items.length} producto{order.items.length > 1 ? "s" : ""}
        </p>
        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
          ${order.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
