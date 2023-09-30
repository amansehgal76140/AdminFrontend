import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../constant";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import Receipt from "./Receipt";

const drawerWidth = 310;

const OrderDetails = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewOrder, setPreviewOrder] = useState({
    name: "",
    email: "",
    orderTime: "",
    orderId: "",
    company: "",
    mobile: "",
    address: "",
    message: "",
    country: "",
    id: "",
  });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    axios
      .get(`${baseUrl}/getOrders`)
      .then((res) => {
        console.log(res.data.results);
        setOrders(res.data.results);
      })
      .catch((err) => {
        setErrorMessage("Problem in Fetching Data");
      });
  }, []);

  const previewProject = (index) => {
    setPreviewOrder(orders[index]);
    setActiveTab(1);
  };

  if (activeTab === 1)
    return <Receipt previewOrder={previewOrder} setActiveTab={setActiveTab} />;

  return (
    <Box p={3}>
      <Paper>
        <Box p={3}>
          <Box my={3} display={"flex"} justifyContent={"center"}>
            <Typography variant="h5">View All Orders</Typography>
          </Box>
          {errorMessage.length > 0 && (
            <Box my={3}>
              <Alert severity="error" onClose={() => setErrorMessage("")}>
                {errorMessage}
              </Alert>
            </Box>
          )}
          <TableContainer component={"div"} sx={{ mt: 3 }}>
            <Table
              sx={{
                minWidth: `calc(100vw - ${drawerWidth}px)`,
                border: "0.2px solid grey",
              }}
              aria-label="simple table"
            >
              <TableHead sx={{ backgroundColor: "primary.secondary" }}>
                <TableRow>
                  <TableCell align="left">Order Id</TableCell>
                  <TableCell align="left">Supplier Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Company Name</TableCell>
                  <TableCell align="left">Date and Time</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => {
                  return (
                    <TableRow
                      key={order.orderId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{order.orderId}</TableCell>
                      <TableCell align="left">{order.name}</TableCell>
                      <TableCell align="left">{order.email}</TableCell>
                      <TableCell align="left">{order.company}</TableCell>
                      <TableCell align="left">
                        {new Date(order.orderTime).toLocaleString()}
                      </TableCell>
                      <TableCell align="left">
                        <Tooltip title="View Order Details">
                          <IconButton onClick={() => previewProject(index)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderDetails;
