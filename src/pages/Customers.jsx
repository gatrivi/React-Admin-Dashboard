import React, { useState, useMemo } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { customersData, customerFilters } from "../data/pymeData";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import CustomerCard from "../components/CustomerCard";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

const Customers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("TODOS");

  const filteredCustomers = useMemo(() => {
    return customersData.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search);
      const matchesFilter = filter === "TODOS" || customer.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const gridColumns = [
    {
      field: "name",
      headerText: "Cliente",
      width: "180",
      textAlign: "Left",
    },
    {
      field: "email",
      headerText: "Email",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "phone",
      headerText: "Teléfono",
      width: "140",
      textAlign: "Left",
    },
    {
      field: "ordersCount",
      headerText: "Pedidos",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "totalSpent",
      headerText: "Total",
      width: "120",
      textAlign: "Right",
      format: "C2",
    },
    {
      headerText: "Estado",
      width: "100",
      textAlign: "Center",
      template: (props) => <StatusBadge status={props.status} type="customer" />,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Clientes
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Directorio de clientes registrados
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar cliente..."
      />

      <FilterChips
        options={customerFilters}
        active={filter}
        onChange={setFilter}
      />

      {/* Mobile card view */}
      <div className="block md:hidden space-y-3">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        ) : (
          <EmptyState message="No se encontraron clientes" />
        )}
      </div>

      {/* Desktop grid view */}
      <div className="hidden md:block bg-white dark:bg-secondary-dark-bg rounded-3xl p-6 shadow-sm">
        <GridComponent
          id="customersGrid"
          dataSource={filteredCustomers}
          allowPaging
          allowSorting
          toolbar={["Delete"]}
          editSettings={{ allowDeleting: true, allowEditing: true }}
          pageSettings={{ pageSize: 10 }}
        >
          <ColumnsDirective>
            {gridColumns.map((col, idx) => (
              <ColumnDirective key={idx} {...col} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Customers;
