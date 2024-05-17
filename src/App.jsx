import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const AppLayout = lazy(() => import("./ui/AppLayout"));
import { useViews } from "./contexts/ViewsContext";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import Loader from "./ui/Loader";
import Book from "./features/book/BookView";
import Table from "./features/tables/Table";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // staleTime: 0,
    },
  },
});
function App() {
  const { defaultStyle } = useViews();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route
              path="/app"
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route
                path="/app"
                element={<Navigate replace to={defaultStyle} />}
              />
              <Route path="classic" element={<Table section="classic" />} />
              <Route path="modern" element={<Table section="modern" />} />
              <Route path="history" element={<Table section="history" />} />
              (// todo - add search query param)
              <Route path="search" element={<Table section="search" />} />
              <Route path="book/:id" element={<Book />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
