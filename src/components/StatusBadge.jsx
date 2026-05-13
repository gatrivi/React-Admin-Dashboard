import React from "react";
import { ORDER_STATUS, CUSTOMER_STATUS } from "../data/pymeData";

const StatusBadge = ({ status, type = "order" }) => {
  const config = type === "order" ? ORDER_STATUS[status] : CUSTOMER_STATUS[status];
  if (!config) return null;

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: config.bg,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
