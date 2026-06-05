import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiX, FiChevronRight } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import { useStateContext } from "../context/ContextProvider";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const { updateOrderStatus } = useStateContext();

  const handleQuickAction = (e, action) => {
    e.stopPropagation();
    const newStatus = action === "Confirmar" ? "EN_PROCESO" : "CANCELADO";
    updateOrderStatus(order.id, newStatus);
  };

  const isPending = order.status === "PENDIENTE";

  return (
    <div
      onClick={() => navigate(`/pedido/${order.id}`)}
      className={`group bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border transition-all active:scale-[0.99] cursor-pointer ${
        isPending 
          ? "border-amber-200 dark:border-amber-900/30 hover:border-amber-400" 
          : "border-gray-100 dark:border-gray-700 hover:shadow-md"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {isPending && (
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          )}
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.id}</p>
            <p className="text-sm font-black text-gray-800 dark:text-gray-100 mt-0.5">
              {order.customerName}
            </p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50 dark:border-gray-800">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            {order.date} · {order.items.length} ítems
          </p>
          <p className="text-sm font-black text-gray-800 dark:text-gray-100 mt-0.5">
            ${order.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </p>
        </div>

        {isPending ? (
          <div className="flex gap-2">
            <button 
              onClick={(e) => handleQuickAction(e, "Rechazar")}
              className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FiX size={18} />
            </button>
            <button 
              onClick={(e) => handleQuickAction(e, "Confirmar")}
              className="p-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
            >
              <FiCheck size={18} />
            </button>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
            <FiChevronRight size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
