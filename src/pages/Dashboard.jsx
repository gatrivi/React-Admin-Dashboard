import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiX, FiPower, FiExternalLink, FiShare2, FiAlertTriangle } from "react-icons/fi";
import { dashboardStats, productsData } from "../data/pymeData";
import OrderCard from "../components/OrderCard";
import DashboardSkeleton from "../components/Skeletons/DashboardSkeleton";
import { useStateContext } from "../context/ContextProvider";

const Dashboard = () => {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useStateContext();
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // Filter for low stock products for the alert widget
  const lowStockProducts = productsData.filter(p => p.stock <= 10).slice(0, 2);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const pendingOrders = orders.filter(o => o.status === "PENDIENTE");
  const recentOrders = orders.filter(o => o.status !== "PENDIENTE").slice(0, 5);

  const handleQuickAction = (e, orderId, action) => {
    e.stopPropagation();
    const newStatus = action === "Confirmar" ? "EN_PROCESO" : "CANCELADO";
    updateOrderStatus(orderId, newStatus);
  };

  const handleToggleStore = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Merchant Quick Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white">
            Hola, Admin 👋
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
            Tu tienda está <span className={isOpen ? "text-green-500" : "text-red-500"}>{isOpen ? "Abierta" : "Cerrada"}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert("Compartir link de la tienda")}
            className="p-3 rounded-2xl bg-white dark:bg-secondary-dark-bg border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 shadow-sm transition-transform active:scale-95"
          >
            <FiShare2 size={20} />
          </button>
          <button 
            onClick={handleToggleStore}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg ${
              isOpen 
                ? "bg-green-500 text-white shadow-green-500/20" 
                : "bg-red-500 text-white shadow-red-500/20"
            }`}
          >
            <FiPower size={18} />
            <span className="hidden sm:inline">{isOpen ? "Cerrar Tienda" : "Abrir Tienda"}</span>
          </button>
        </div>
      </div>

      {/* Main Stats (Actionable) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {dashboardStats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 transition-transform hover:scale-[1.02] cursor-default"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3"
              style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}
            >
              {stat.icon}
            </div>
            <p className="text-2xl font-black text-gray-800 dark:text-gray-100">
              {stat.value}
            </p>
            <p className="text-xs font-bold text-gray-400 uppercase mt-0.5">
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Layout Row: Performance + Stock Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Performance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Desempeño Hoy</h3>
              <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors flex items-center gap-1">
                Ver detalles <FiExternalLink size={12} />
              </button>
            </div>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-black">$12,450</p>
              <span className="bg-green-400/30 text-green-100 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                +15% vs ayer
              </span>
            </div>
            <p className="text-blue-100 text-xs mt-1 font-medium opacity-80">
              Has vendido un 15% más que ayer a esta misma hora.
            </p>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Stock Alert Widget */}
        <div className="bg-white dark:bg-secondary-dark-bg rounded-3xl p-5 border border-red-100 dark:border-red-900/20 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FiAlertTriangle className="text-amber-500" size={18} />
            <h3 className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight">
              Alertas de Stock
            </h3>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={product.image} className="w-8 h-8 rounded-lg object-cover" alt="" />
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-white leading-none">{product.name}</p>
                    <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-tighter">Solo {product.stock} unidades</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Producto ${product.name} pausado`)}
                  className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest"
                >
                  Pausar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Orders (PENDING) - High Priority */}
      {pendingOrders.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h2 className="text-lg font-black text-gray-800 dark:text-white">
                Nuevos Pedidos ({pendingOrders.length})
              </h2>
            </div>
          </div>
          <div className="space-y-3">
            {pendingOrders.map((order) => (
              <div 
                key={order.id} 
                onClick={() => navigate(`/pedido/${order.id}`)}
                className="group relative bg-white dark:bg-secondary-dark-bg border-2 border-amber-200 dark:border-amber-900/30 rounded-2xl p-4 cursor-pointer hover:border-amber-400 transition-all shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-black">
                      {order.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-gray-800 dark:text-gray-100">{order.customerName}</p>
                        <span className="text-[10px] text-gray-400 font-bold">{order.time}</span>
                      </div>
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                        {order.items.length} productos · Total: ${order.total.toLocaleString("es-MX")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => handleQuickAction(e, order.id, "Rechazar")}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                    >
                      <FiX size={20} />
                    </button>
                    <button 
                      onClick={(e) => handleQuickAction(e, order.id, "Confirmar")}
                      className="p-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
                    >
                      <FiCheck size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity Section */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-lg font-black text-gray-800 dark:text-white uppercase tracking-tight">
            Actividad Reciente
          </h2>
          <button
            onClick={() => navigate("/pedidos")}
            className="text-xs text-blue-500 font-bold hover:underline bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full"
          >
            VER TODO
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
