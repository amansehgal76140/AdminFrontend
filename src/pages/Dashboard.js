import { Routes, Route } from "react-router-dom";
import ViewSupplier from "../pages/ViewSupplier";
import SideBar from "../components/SideBar";
import DisplayDashboard from "./DisplayDashboard";
import { Box } from "@mui/material";
import AddSupplier from "./AddSupplier";
import NewRequisition from "./NewRequisition";
import PendingRequisition from "./PendingRequisition";
import ApprovedRequisition from "./ApprovedRequisition";
import SupplierQuote from "../pages/QuoteDetails/SupplierQuote";
import RequisitionQuote from "./QuoteDetails/RequisitionQuote";
import OrderDetails from "./OrdersArchive/OrderDetails";

const projectId = "20235810413435_";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Routes>
        <Route path="/dashboard" element={<div>Hello World!!</div>} />
        <Route path="/viewsupplier" element={<ViewSupplier />} />
        <Route path="/addnewsupplier" element={<AddSupplier />} />
        <Route path="/editsupplier/:supplierId" element={<AddSupplier />} />
        <Route path="/newrequisition" element={<NewRequisition />} />
        <Route
          path="/pendingrequisition"
          element={<PendingRequisition status={["Pending"]} />}
        />
        <Route path="/supplierQuote" element={<SupplierQuote />} />
        <Route
          path="/viewcomparestatement/:projectId"
          element={<RequisitionQuote />}
        />
        <Route
          path="/approvedrequisition"
          element={<ApprovedRequisition status={["Approved"]} />}
        />
        <Route path="/sentEmail/:projectId" element={<DisplayDashboard />} />
        <Route path="/receiptarchive" element={<OrderDetails />} />
      </Routes>
    </Box>
  );
};

export default Dashboard;
