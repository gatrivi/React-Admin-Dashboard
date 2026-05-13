import React from "react";

const FilterChips = ({ options, active, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {options.map((opt) => {
        const isActive = active === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              isActive
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-white dark:bg-secondary-dark-bg text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
