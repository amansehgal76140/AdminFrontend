import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { baseUrl } from "../constant";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Alert from "@mui/material/Alert";
import VisibilityIcon from "@mui/icons-material/Visibility";

const drawerWidth = 280;
function RequisitionTable({ status, message, previewMaterial }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [requisitions, setRequisitions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setSuccessMessage(message);
    axios
      .post(`${baseUrl}/getAllRequisitions`, {
        status: status,
      })
      .then((res) => {
        console.log(res.data);
        setRequisitions(res.data.requisitions);
      })
      .catch((err) => {
        setErrorMessage("Problem in Fetching Requisitions");
      });
  }, []);

  const handleSubmit = (projectData) => {
    previewMaterial(projectData);
  };

  return (
    <Box p={3}>
      {successMessage.length > 0 || errorMessage.length > 0 ? (
        <Box marginY={2}>
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
              <TableCell align="left">Requsition Number</TableCell>
              <TableCell align="left">Project Name</TableCell>
              <TableCell align="left">Date and Time</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requisitions.map((requisitionDetails) => {
              const dateString = requisitionDetails.requisitionTime;
              const date = new Date(dateString);
              return (
                <TableRow
                  key={requisitionDetails.projectId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    {requisitionDetails.projectId}
                  </TableCell>
                  <TableCell align="left">{requisitionDetails.name}</TableCell>
                  <TableCell align="left">{date.toLocaleString()}</TableCell>

                  <TableCell align="left">
                    {requisitionDetails.status}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => handleSubmit(requisitionDetails)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default RequisitionTable;
