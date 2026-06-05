import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { orderFilters } from "../data/pymeData";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import OrderCard from "../components/OrderCard";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import { FiFilter, FiDownload, FiCalendar } from "react-icons/fi";
import { useStateContext } from "../context/ContextProvider";

const Orders = () => {
  const navigate = useNavigate();
  const { orders } = useStateContext();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("TODOS");
  const [view, setView] = useState("cards"); // 'cards' or 'table'

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "TODOS" || order.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="space-y-5 pb-10">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tight">
            Pedidos
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase mt-1 tracking-widest">
            Cola de trabajo en tiempo real
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-xl bg-white dark:bg-secondary-dark-bg border border-gray-100 dark:border-gray-700 text-gray-500 shadow-sm">
            <FiCalendar size={18} />
          </button>
          <button className="p-2.5 rounded-xl bg-white dark:bg-secondary-dark-bg border border-gray-100 dark:border-gray-700 text-gray-500 shadow-sm">
            <FiDownload size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar por cliente o # pedido..."
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <FilterChips
            options={orderFilters}
            active={filter}
            onChange={setFilter}
          />
        </div>
      </div>

      {/* Grid/Table View Toggle (Mobile Responsive) */}
      <div className="space-y-3">
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <div 
                key={order.id}
                className="group relative"
              >
                <OrderCard order={order} />
                {order.status === "PENDIENTE" && (
                  <div className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-secondary-dark-bg rounded-3xl p-10 border border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
            <EmptyState message="No se encontraron pedidos con este filtro" />
            <button 
              onClick={() => setFilter("TODOS")}
              className="mt-4 text-sm font-bold text-blue-500 hover:underline"
            >
              Ver todos los pedidos
            </button>
          </div>
        )}
      </div>

      {/* Action Bar (Only visible if multi-select were implemented) */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 md:bottom-10 print:hidden pointer-events-none">
        <div className="bg-gray-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 opacity-0 translate-y-10 transition-all pointer-events-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">0 seleccionados</span>
          <div className="h-4 w-px bg-gray-700" />
          <button className="text-sm font-bold hover:text-blue-400">IMPRIMIR TODO</button>
          <button className="text-sm font-bold hover:text-green-400">DESCARGAR EXCEL</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
