import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";

import { useBooks } from "./contexts/BooksContext";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import AppLayout from "./ui/AppLayout";
import Loader from "./ui/Loader";
import { ReadingTable, HistoryTable, SearchTable } from "./ui/TableTypes";
import Book from "./features/book/BookView";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
  const { defaultStyle } = useBooks();

  return (
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
            <Route index element={<Navigate replace to={defaultStyle} />} />
            <Route path="classic" element={<ReadingTable period="classic" />} />
            <Route path="modern" element={<ReadingTable period="modern" />} />
            <Route path="history" element={<HistoryTable />} />
            (// todo - add search query param)
            <Route path="search" element={<SearchTable />} />
            <Route path="book/:id" element={<Book />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
