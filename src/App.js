import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import FillQuoteDetails from "./pages/FillQuoteDetails";
import FillQuote from "./pages/FillQuote";
import QuoteSubmitted from "./pages/QuoteSubmitted";
import ViewOrder from "./pages/OrdersArchive/ViewOrder";

function App() {
  return (
    <Routes>
      <Route path="*" element={<div>Page Not Found!!</div>} />
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
