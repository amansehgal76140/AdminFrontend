import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import FillQuoteDetails from "./pages/SupplierQuote/FillQuoteDetails";
import FillQuote from "./pages/SupplierQuote/FillQuote";
import QuoteSubmitted from "./pages/SupplierQuote/QuoteSubmitted";
import ViewOrder from "./pages/OrdersArchive/ViewOrder";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/elgc/submit-your-quote/:projectId"
        element={<FillQuoteDetails />}
      />
      <Route
        path="/elgc/submit-details/:projectId/:id"
        element={<FillQuote />}
      />
      <Route path="/elgc/thanksPage" element={<QuoteSubmitted />} />
      <Route path="/elgc/vieworder/:orderId/:id" element={<ViewOrder />} />
    </Routes>
  );
}

export default App;
