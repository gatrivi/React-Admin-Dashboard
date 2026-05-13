import React, { useState, useMemo } from "react";
import { productsData, productCategories } from "../data/pymeData";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";

const Products = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("TODOS");

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "TODOS" || product.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Productos
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Catálogo sincronizado con tu tienda
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar producto o SKU..."
      />

      <FilterChips
        options={productCategories}
        active={filter}
        onChange={setFilter}
      />

      {/* Mobile/Tablet card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState message="No se encontraron productos" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
