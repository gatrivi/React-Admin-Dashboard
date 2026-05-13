import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Sidebar, BottomNav } from "./components";

import {
  Dashboard,
  Orders,
  OrderDetail,
  Customers,
  CustomerDetail,
  Products,
  More,
  Kanban,
  Editor,
  Calendar,
  Employees,
  Ecommerce,
  ColorPicker,
  Area,
  Bar,
  ColorMapping,
  Financial,
  Line,
  Pie,
  Pyramid,
  Stacked,
} from "./pages";

import { useStateContext } from "./context/ContextProvider";

const App = () => {
  const { activeMenu, currentMode } = useStateContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg bg-gray-50 min-h-screen">
          {/* Desktop Sidebar */}
          <div
            className={`hidden md:block fixed sidebar dark:bg-secondary-dark-bg bg-white transition-all duration-300 ease-in-out h-screen z-40 ${
              activeMenu ? "w-72" : "w-0 overflow-hidden"
            }`}
          >
            <Sidebar />
          </div>

          {/* Main Content */}
          <div
            className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out w-full ${
              activeMenu ? "md:ml-72" : "md:ml-0"
            }`}
          >
            <div className="fixed top-0 left-0 right-0 md:left-auto bg-main-bg dark:bg-main-dark-bg navbar z-30 md:static">
              <Navbar />
            </div>

            <main className="flex-1 pt-16 md:pt-4 px-4 pb-20 md:pb-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pedidos" element={<Orders />} />
                <Route path="/pedido/:id" element={<OrderDetail />} />
                <Route path="/clientes" element={<Customers />} />
                <Route path="/cliente/:id" element={<CustomerDetail />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/mas" element={<More />} />

                {/* Herramientas Enterprise */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendario" element={<Calendar />} />
                <Route path="/empleados" element={<Employees />} />
                <Route path="/ecommerce" element={<Ecommerce />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* Gráficos */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </main>
          </div>

          {/* Mobile Bottom Nav */}
          <BottomNav />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
