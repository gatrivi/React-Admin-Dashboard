import React from "react";
import { ORDER_STATUS } from "../data/pymeData";
import { FiCheck } from "react-icons/fi";

const allStatuses = ["PENDIENTE", "EN_PROCESO", "ENVIADO", "ENTREGADO"];

const Timeline = ({ order }) => {
  const currentIndex = allStatuses.indexOf(order.status);
  const isCancelled = order.status === "CANCELADO";

  return (
    <div className="space-y-0">
      {isCancelled ? (
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
              style={{ backgroundColor: ORDER_STATUS.CANCELADO.color }}
            >
              <FiCheck size={14} />
            </div>
          </div>
          <div className="pb-6">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {ORDER_STATUS.CANCELADO.label}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {order.timeline.find((t) => t.status === "CANCELADO")?.date || ""}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {order.timeline.find((t) => t.status === "CANCELADO")?.note || ""}
            </p>
          </div>
        </div>
      ) : (
        allStatuses.map((status, idx) => {
          const isCompleted = idx <= currentIndex;
          const isLast = idx === allStatuses.length - 1;
          const timelineEntry = order.timeline.find((t) => t.status === status);

          return (
            <div key={status} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs transition-colors ${
                    isCompleted ? "" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                  style={
                    isCompleted
                      ? { backgroundColor: ORDER_STATUS[status].color }
                      : {}
                  }
                >
                  {isCompleted ? <FiCheck size={14} /> : <span className="text-gray-400 text-[10px]">{idx + 1}</span>}
                </div>
                {!isLast && (
                  <div
                    className={`w-0.5 h-8 ${
                      idx < currentIndex
                        ? "bg-green-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
              <div className={`pb-6 ${!isLast ? "" : ""}`}>
                <p
                  className={`text-sm font-semibold ${
                    isCompleted
                      ? "text-gray-800 dark:text-gray-100"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {ORDER_STATUS[status].label}
                </p>
                {timelineEntry && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {timelineEntry.date}
                  </p>
                )}
                {timelineEntry?.note && (
                  <p className="text-xs text-gray-400 mt-1">
                    {timelineEntry.note}
                  </p>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Timeline;
