import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";

import { ViewsProvider } from "./contexts/ViewsContext.jsx";
import { CountriesProvider } from "./contexts/CountriesContext";
import { ErrorFallback } from "./ui/ErrorFallback.jsx";
import App from "./App.jsx";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // staleTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ViewsProvider>
          <CountriesProvider>
            <App />
          </CountriesProvider>
        </ViewsProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
