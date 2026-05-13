import React from "react";
import { FiInbox } from "react-icons/fi";

const EmptyState = ({ message = "No hay resultados" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <FiInbox className="text-5xl mb-3 opacity-50" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default EmptyState;
