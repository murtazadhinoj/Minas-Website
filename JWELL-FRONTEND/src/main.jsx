import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CartProvider } from "./Context/cartContext";
import { AppProvider } from "./Context/productContext";

import "./index.css"; // 🔥 VERY IMPORTANT

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
