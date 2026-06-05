import React, { useState, useEffect } from "react";
import { FiBell, FiShoppingBag, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const LiveNotification = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Simulate an incoming order after 5 seconds for the demo
    const timer = setTimeout(() => {
      setNotification({
        id: Date.now(),
        title: "¡Nuevo Pedido!",
        message: "María González acaba de realizar un pedido por $2,450",
        type: "order",
      });
      
      // Optional: Play a subtle notification sound
      // const audio = new Audio('/order-notification.mp3');
      // audio.play().catch(() => {}); 
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!notification) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed top-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-[100]"
      >
        <div className="bg-white dark:bg-secondary-dark-bg border-2 border-blue-500 shadow-2xl rounded-2xl p-4 flex gap-4 items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
            <FiShoppingBag size={24} className="animate-bounce" />
          </div>
          
          <div className="flex-1">
            <p className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight">
              {notification.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
              {notification.message}
            </p>
            <div className="flex gap-3 mt-2">
              <button 
                onClick={() => setNotification(null)}
                className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline"
              >
                Ver Detalle
              </button>
              <button 
                onClick={() => setNotification(null)}
                className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:underline"
              >
                Ignorar
              </button>
            </div>
          </div>

          <button 
            onClick={() => setNotification(null)}
            className="text-gray-300 hover:text-gray-500 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LiveNotification;
