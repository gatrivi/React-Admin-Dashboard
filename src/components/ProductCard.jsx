import React, { useState } from "react";
import { FiShare2, FiZap } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const [isActive, setIsActive] = useState(true);
  const stockLow = product.stock <= 10;

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const handlePromote = (e) => {
    e.stopPropagation();
    alert(`Generando imagen publicitaria para ${product.name}... (Ideal para Instagram Stories)`);
  };

  return (
    <div className={`bg-white dark:bg-secondary-dark-bg rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 group ${
      isActive 
        ? "border-gray-100 dark:border-gray-700 opacity-100" 
        : "border-gray-200 dark:border-gray-800 opacity-60 grayscale-[0.5]"
    }`}>
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {/* Availability Toggle */}
          <button 
            onClick={handleToggle}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors relative z-10 ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${isActive ? 'translate-x-5' : 'translate-x-0 shadow-sm'}`} />
          </button>
        </div>
        
        {/* Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-black/60 to-transparent flex justify-center gap-2">
          <button 
            onClick={handlePromote}
            className="flex-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black py-2 rounded-xl border border-white/20 hover:bg-white/30 flex items-center justify-center gap-1 uppercase tracking-tighter"
          >
            <FiZap size={12} /> Promocionar
          </button>
        </div>

        {!isActive && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-white shadow-lg uppercase">
              No Disponible
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.category}</p>
          <span
            className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter ${
              stockLow
                ? "bg-red-50 text-red-600 dark:bg-red-900/20"
                : "bg-green-50 text-green-600 dark:bg-green-900/20"
            }`}
          >
            {stockLow ? `Stock Bajo` : `OK`}
          </span>
        </div>
        <p className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-tight min-h-[40px]">
          {product.name}
        </p>
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50 dark:border-gray-800">
          <p className="text-base font-black text-gray-800 dark:text-gray-100">
            ${product.price.toLocaleString("es-MX")}
          </p>
          <button className="text-gray-400 hover:text-blue-500 transition-colors">
            <FiShare2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
