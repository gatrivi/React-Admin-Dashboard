import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPhone, FiMapPin, FiMessageSquare, FiPrinter, FiCheck, FiX } from "react-icons/fi";
import { ORDER_STATUS } from "../data/pymeData";
import StatusBadge from "../components/StatusBadge";
import Timeline from "../components/Timeline";
import { useStateContext } from "../context/ContextProvider";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useStateContext();
  const order = orders.find((o) => o.id === id);

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
  
  const handleWhatsApp = () => {
    const message = `Hola ${order.customerName}, te contacto desde la tienda por tu pedido ${order.id}.`;
    const url = `https://wa.me/${order.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleUpdateStatus = (newStatus) => {
    updateOrderStatus(order.id, newStatus);
  };

  const getNextStatus = () => {
    const flow = ["PENDIENTE", "EN_PROCESO", "ENVIADO", "ENTREGADO"];
    const idx = flow.indexOf(order.status);
    return flow[idx + 1];
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto pb-24 md:pb-10">
      {/* Printable Area (Only shown during print) */}
      <div className="hidden print:block receipt-container">
        <div className="text-center">
          <h1 className="text-xl font-bold uppercase tracking-widest">Ticket de Pedido</h1>
          <p className="text-sm font-mono mt-1">{order.id}</p>
          <p className="text-xs font-mono">{order.date} {order.time}</p>
        </div>
        
        <div className="receipt-dashed" />
        
        <div className="mb-4">
          <p className="font-bold uppercase text-[10px]">Cliente:</p>
          <p className="text-sm">{order.customerName}</p>
          <p className="text-xs">{order.customerPhone}</p>
          <p className="text-xs">{order.shippingAddress}</p>
        </div>

        <div className="receipt-dashed" />
        
        <div className="space-y-1">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs">
              <span>{item.qty}x {item.name}</span>
              <span>${(item.qty * item.price).toLocaleString("es-MX")}</span>
            </div>
          ))}
        </div>

        <div className="receipt-dashed" />
        
        <div className="flex justify-between font-bold text-sm">
          <span>TOTAL</span>
          <span>${order.total.toLocaleString("es-MX")}</span>
        </div>
        
        <p className="text-[10px] mt-4">Pago: {order.paymentMethod}</p>
        
        {order.notes && (
          <div className="mt-4">
            <p className="font-bold uppercase text-[10px]">Notas:</p>
            <p className="text-xs italic">{order.notes}</p>
          </div>
        )}

        <div className="receipt-dashed" />
        <div className="text-center text-[10px] mt-4">
          <p>¡Gracias por tu compra!</p>
          <p>AdminPYME DEMO</p>
        </div>
      </div>

      {/* Screen Header */}
      <div className="flex items-center gap-3 print:hidden">
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
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors"
            title="Imprimir ticket"
          >
            <FiPrinter size={18} />
          </button>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Printable View Header (Only shown during print) */}
      <div className="hidden print:block text-center border-b pb-4 mb-4">
        <h1 className="text-xl font-bold">TICKET DE PEDIDO</h1>
        <p className="text-sm">{order.id}</p>
        <p className="text-sm">{order.date} {order.time}</p>
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
          <button 
            onClick={handleWhatsApp}
            className="p-2.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 transition-colors print:hidden"
          >
            <FiMessageSquare size={20} />
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
            Pago: {order.paymentMethod}
          </p>
          <p className="text-base font-bold text-gray-800 dark:text-gray-100">
            Total: ${order.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Timeline - Hidden on print */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 print:hidden">
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

      {/* Quick Actions (Floating on mobile) */}
      <div className="fixed bottom-20 left-4 right-4 md:static flex gap-3 print:hidden">
        {order.status === "PENDIENTE" ? (
          <>
            <button
              onClick={() => handleUpdateStatus("CANCELADO")}
              className="flex-1 py-3.5 rounded-2xl bg-white dark:bg-gray-800 text-red-500 font-bold text-sm border border-red-100 dark:border-red-900/30 shadow-lg md:shadow-none flex items-center justify-center gap-2"
            >
              <FiX size={18} /> Cancelar
            </button>
            <button
              onClick={() => handleUpdateStatus("EN_PROCESO")}
              className="flex-[2] py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <FiCheck size={18} /> Confirmar Pedido
            </button>
          </>
        ) : (
          ["EN_PROCESO", "ENVIADO"].includes(order.status) && (
            <button
              className="w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ backgroundColor: statusConfig?.color || "#3B82F6" }}
              onClick={() => handleUpdateStatus(getNextStatus())}
            >
              Marcar como {ORDER_STATUS[getNextStatus()]?.label}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
