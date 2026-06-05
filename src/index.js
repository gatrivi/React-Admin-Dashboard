import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/ContextProvider";
import { AdminProvider } from "./context/AdminContext";
import { MenuProvider } from "./context/MenuContext";
import { registerLicense } from "@syncfusion/ej2-base";

//registerLicense(process.env.REACT_APP_SYNCFUSION_KEY);
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjW31acXNRRmNfVkBwWg=="
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <AdminProvider>
      <MenuProvider>
        <App />
      </MenuProvider>
    </AdminProvider>
  </ContextProvider>
);
