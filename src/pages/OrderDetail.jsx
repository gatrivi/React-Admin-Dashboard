import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPhone, FiMapPin, FiMessageSquare } from "react-icons/fi";
import { ordersData, ORDER_STATUS } from "../data/pymeData";
import StatusBadge from "../components/StatusBadge";
import Timeline from "../components/Timeline";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = ordersData.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Pedido no encontrado</p>
        <button
          onClick={() => navigate("/pedidos")}
          className="mt-4 text-blue-500 font-medium"
        >
          Volver a pedidos
        </button>
      </div>
    );
  }

  const statusConfig = ORDER_STATUS[order.status];
  const canAdvance = ["PENDIENTE", "EN_PROCESO", "ENVIADO"].includes(order.status);

  const getNextStatus = () => {
    const flow = ["PENDIENTE", "EN_PROCESO", "ENVIADO", "ENTREGADO"];
    const idx = flow.indexOf(order.status);
    return flow[idx + 1];
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiArrowLeft className="text-gray-600 dark:text-gray-300" size={20} />
        </button>
        <div className="flex-1">
          <p className="text-xs text-gray-400">{order.id}</p>
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">
            Detalle del Pedido
          </h1>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Customer Info */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Cliente
        </h2>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm flex-shrink-0">
            {order.customerName.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {order.customerName}
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <FiPhone size={12} />
              <span>{order.customerPhone}</span>
            </div>
            <div className="flex items-start gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <FiMapPin size={12} className="mt-0.5 flex-shrink-0" />
              <span>{order.shippingAddress}</span>
            </div>
          </div>
          <button className="p-2 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 transition-colors">
            <FiMessageSquare size={18} />
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Productos ({order.items.length})
        </h2>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500">
                  {item.qty}x
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    ${item.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })} c/u
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                ${(item.qty * item.price).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Método de pago: {order.paymentMethod}
          </p>
          <p className="text-base font-bold text-gray-800 dark:text-gray-100">
            Total: ${order.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Seguimiento
        </h2>
        <Timeline order={order} />
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-100 dark:border-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
            Notas
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            {order.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      {canAdvance && (
        <div className="sticky bottom-20 md:static bg-white/80 dark:bg-secondary-dark-bg/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <button
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-transform active:scale-[0.98]"
            style={{ backgroundColor: statusConfig?.color || "#3B82F6" }}
            onClick={() => alert(`Cambiar estado a: ${ORDER_STATUS[getNextStatus()]?.label}`)}
          >
            Marcar como {ORDER_STATUS[getNextStatus()]?.label}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
