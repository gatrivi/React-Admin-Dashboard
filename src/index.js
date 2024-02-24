import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/ContextProvider";

//import { registerLicense } from "@syncfusion/ej2-base";

//registerLicense(process.env.REACT_APP_SYNCFUSION_KEY);

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById("root")
);
