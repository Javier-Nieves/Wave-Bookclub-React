import React from "react";
import ReactDOM from "react-dom/client";

import { BooksProvider } from "./contexts/BooksContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CountriesProvider } from "./contexts/CountriesContext";

import App from "./App.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BooksProvider>
        <CountriesProvider>
          <App />
        </CountriesProvider>
      </BooksProvider>
    </AuthProvider>
  </React.StrictMode>
);
