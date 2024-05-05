import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import ProtectedRoutes from "./ui/ProtectedRoutes";
import AppLayout from "./ui/AppLayout";
import NotFound from "./ui/NotFound";
import Loader from "./ui/Loader";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="app"
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
