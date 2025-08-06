import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "./components/Loader/Loader";
import { Layout } from "./pages/Layout/Layout";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const DesktopPage = lazy(() => import("./pages/DesktopPage"));
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <DesktopPage />
            </Suspense>
          }
        />
        <Route
          path="/transactions"
          element={
            <Suspense fallback={<Loader />}>
              <TransactionsPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
