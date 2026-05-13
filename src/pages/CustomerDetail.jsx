import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPhone, FiMail, FiMapPin, FiPlus } from "react-icons/fi";
import { customersData, ordersData } from "../data/pymeData";
import StatusBadge from "../components/StatusBadge";
import OrderCard from "../components/OrderCard";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customersData.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Cliente no encontrado</p>
        <button
          onClick={() => navigate("/clientes")}
          className="mt-4 text-blue-500 font-medium"
        >
          Volver a clientes
        </button>
      </div>
    );
  }

  const customerOrders = ordersData.filter((o) => o.customerId === customer.id);

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
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">
          Cliente
        </h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
        <img
          src={customer.avatar}
          alt={customer.name}
          className="w-20 h-20 rounded-full object-cover mx-auto"
        />
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mt-3">
          {customer.name}
        </h2>
        <div className="flex justify-center mt-2">
          <StatusBadge status={customer.status} type="customer" />
        </div>
        <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FiMail size={14} className="text-gray-400" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FiPhone size={14} className="text-gray-400" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FiMapPin size={14} className="text-gray-400 mt-0.5" />
            <span>{customer.address}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {customer.ordersCount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pedidos</p>
        </div>
        <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            ${customer.totalSpent.toLocaleString("es-MX", { minimumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total</p>
        </div>
        <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {customer.lastOrderDate}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Último</p>
        </div>
      </div>

      {/* Order History */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Historial de Pedidos
          </h2>
        </div>
        <div className="space-y-3">
          {customerOrders.length > 0 ? (
            customerOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">
              Este cliente aún no tiene pedidos
            </p>
          )}
        </div>
      </div>

      {/* Floating action button (mobile) */}
      <button className="fixed right-4 bottom-24 md:hidden w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-40">
        <FiPlus size={24} />
      </button>
    </div>
  );
};

export default CustomerDetail;
