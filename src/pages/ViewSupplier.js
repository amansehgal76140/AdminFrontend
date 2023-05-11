import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { baseUrl } from "../constant";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import { Navigate, useLocation } from "react-router-dom";

const drawerWidth = 260;
const ViewSupplier = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mode, setMode] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  let location = useLocation();

  const editSupplier = (supplierDetails) => {
    setSupplierId(supplierDetails.supplierId);
    setMode(true);
  };

  const deleteSupplier = (supplierDetails) => {
    console.log("deleteSupplier");
    console.log(supplierDetails);
    const requestBody = {
      supplierId: supplierDetails.supplierId,
      fileName: supplierDetails.company_detail,
    };
    axios
      .post(`${baseUrl}/deleteSupplierDetails`, requestBody)
      .then((res) => {
        const temp = [...supplierData];
        const newSupplierData = temp.filter(
          (supplier) => supplier.supplierId !== supplierDetails.supplierId
        );
        setSupplierData(newSupplierData);
        setErrorMessage("");
        setSuccessMessage("Supplier Record Deleted Successfully");
      })
      .catch((err) => {
        setSuccessMessage("");
        setErrorMessage("Error in Deleting Supplier Record");
      });
  };

  const downloadFile = async (company_detail) => {
    console.log("downloadfile");
    const response = await axios.get(
      `${baseUrl}/getSupplierCompanyFile/${company_detail}`,
      {
        responseType: "blob", // specify the response type as blob
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" }); // create a new blob object
    const url = window.URL.createObjectURL(blob); // create a URL for the blob object

    const link = document.createElement("a"); // create a download link
    link.href = url; // set the href attribute of the link to the URL
    const fileName = company_detail.split("_");
    link.setAttribute("download", fileName[fileName.length - 1]); // set the download attribute of the link to the filename
    document.body.appendChild(link); // append the link to the DOM
    link.click(); // trigger a click event on the link to download the file
  };

  useEffect(() => {
    console.log("getSuppliersDetails");
    axios
      .get(`${baseUrl}/getSupplierDetails`)
      .then((res) => {
        console.log(res.data);
        setSupplierData(res.data.suppliers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (mode) {
    const url = `/admin/editsupplier/${supplierId}`;
    return <Navigate to={url} state={{ from: location }} replace />;
  }

  return (
    <Box p={3}>
      {successMessage.length > 0 || errorMessage.length > 0 ? (
        <Box marginY={2}>
          {errorMessage.length > 0 && (
            <Alert
              severity="error"
              onClose={() => {
                setErrorMessage("");
              }}
            >
              {errorMessage}
            </Alert>
          )}
          {successMessage.length > 0 && (
            <Alert
              severity="success"
              onClose={() => {
                setSuccessMessage("");
              }}
            >
              {successMessage}
            </Alert>
          )}
        </Box>
      ) : (
        <></>
      )}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table
          sx={{ minWidth: `calc(100vw - ${drawerWidth}px)` }}
          aria-label="simple table"
        >
          <TableHead sx={{ backgroundColor: "primary.secondary" }}>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Company</TableCell>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="center">Company Details</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supplierData.map((supplierDetails) => {
              return (
                <TableRow
                  key={supplierDetails.supplierId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{supplierDetails.name}</TableCell>
                  <TableCell align="left">{supplierDetails.phone}</TableCell>
                  <TableCell align="left">{supplierDetails.email}</TableCell>
                  <TableCell align="left">
                    {supplierDetails.company_name}
                  </TableCell>
                  <TableCell align="left">
                    {supplierDetails.country_name}
                  </TableCell>
                  <TableCell align="left">{supplierDetails.address}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() =>
                        downloadFile(supplierDetails.company_detail)
                      }
                    >
                      <DownloadIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <Box>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={() => editSupplier(supplierDetails)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deleteSupplier(supplierDetails)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewSupplier;
