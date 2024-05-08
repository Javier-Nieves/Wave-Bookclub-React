import React from "react";
import ReactDOM from "react-dom/client";

import { BooksProvider } from "./contexts/BooksContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ViewsProvider } from "./contexts/ViewsContext.jsx";
import { CountriesProvider } from "./contexts/CountriesContext";

import App from "./App.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BooksProvider>
        <ViewsProvider>
          <CountriesProvider>
            <App />
          </CountriesProvider>
        </ViewsProvider>
      </BooksProvider>
    </AuthProvider>
  </React.StrictMode>
);
