import { Alert, Typography, Box, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
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

const drawerWidth = 310;

function SupplierQuote() {
  const navigate = useNavigate();
  const [requisitions, setRequisitions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    axios
      .get(`${baseUrl}/getQuotationProjects`)
      .then((res) => {
        setRequisitions(res.data.projects);
      })
      .catch((err) => {
        setErrorMessage("Problem in Fetching Data");
      });
  }, []);

  const previewProject = (projectId) => {
    navigate(`/admin/viewcomparestatement/${projectId}`);
  };

  return (
    <Box p={3}>
      <Paper>
        <Box p={3}>
          <Box my={3} display={"flex"} justifyContent={"center"}>
            <Typography variant="h5">View Quoted Projects</Typography>
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
                  <TableCell align="left">Requsition Number</TableCell>
                  <TableCell align="left">Project Name</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Subject</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requisitions.map((requisitionDetails) => {
                  return (
                    <TableRow
                      key={requisitionDetails.projectId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        {requisitionDetails.projectId}
                      </TableCell>
                      <TableCell align="left">
                        {requisitionDetails.name}
                      </TableCell>
                      <TableCell align="left">
                        {requisitionDetails.status}
                      </TableCell>
                      <TableCell align="left">
                        {requisitionDetails.subject}
                      </TableCell>
                      <TableCell align="left">
                        <Tooltip title="Preview Quotations">
                          <IconButton
                            onClick={() =>
                              previewProject(requisitionDetails.projectId)
                            }
                          >
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
}

export default SupplierQuote;
