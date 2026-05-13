import React from "react";

const ProductCard = ({ product }) => {
  const stockLow = product.stock <= 10;

  return (
    <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 leading-tight">
          {product.name}
        </p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
            ${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </p>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              stockLow
                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            {stockLow ? `Solo ${product.stock}` : `${product.stock} disp.`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
