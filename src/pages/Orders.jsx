import React, { useState, useMemo } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { ordersData, orderFilters } from "../data/pymeData";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import OrderCard from "../components/OrderCard";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("TODOS");

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "TODOS" || order.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const gridColumns = [
    {
      field: "id",
      headerText: "Pedido",
      width: "120",
      textAlign: "Left",
    },
    {
      field: "customerName",
      headerText: "Cliente",
      width: "150",
      textAlign: "Left",
    },
    {
      field: "date",
      headerText: "Fecha",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "total",
      headerText: "Total",
      width: "100",
      textAlign: "Right",
      format: "C2",
    },
    {
      headerText: "Estado",
      width: "120",
      textAlign: "Center",
      template: (props) => <StatusBadge status={props.status} />,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Pedidos
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Gestiona los pedidos de tus clientes
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar por cliente o número de pedido..."
      />

      <FilterChips
        options={orderFilters}
        active={filter}
        onChange={setFilter}
      />

      {/* Mobile card view */}
      <div className="block md:hidden space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <EmptyState message="No se encontraron pedidos" />
        )}
      </div>

      {/* Desktop grid view */}
      <div className="hidden md:block bg-white dark:bg-secondary-dark-bg rounded-3xl p-6 shadow-sm">
        <GridComponent
          id="ordersGrid"
          dataSource={filteredOrders}
          allowPaging
          allowSorting
          pageSettings={{ pageSize: 10 }}
        >
          <ColumnsDirective>
            {gridColumns.map((col, idx) => (
              <ColumnDirective key={idx} {...col} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              Edit,
              PdfExport,
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
};

export default Orders;
