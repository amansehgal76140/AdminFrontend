import { Paper, Box, Typography, Button, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import ELGCImage from "../image/ELGC-Logo-removebg-preview-1.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { baseUrl } from "../constant";
import styles from "./RequisitionDetails.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import ApproveImage from "../image/Signature1.png";
import orderedIamge from "../image/Signature3(GeneralManager).png";

const spanStyle = {
  fontWeight: "bold",
};

function RequisitionDetails({
  projectDetails,
  handleDeleteRequisition,
  backTab,
  setProjectDetails,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [material, setMaterial] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseUrl}/getRequisitions/${projectDetails.projectId}`)
      .then((res) => {
        setMaterial(res.data.materials);
      })
      .catch((err) => {
        setErrorMessage("Problem in Fetching Data");
      });
  }, []);

  const deleteRequisition = () => {
    axios
      .post(`${baseUrl}/deleteRequisition/${projectDetails.projectId}`)
      .then((res) => {
        handleDeleteRequisition();
      })
      .catch((err) => {
        setErrorMessage("Problem in Deleting Requisition");
      });
  };

  const approveRequisition = () => {
    axios
      .post(`${baseUrl}/updateStatus/${projectDetails.projectId}`)
      .then((res) => {
        setSuccessMessage("Requisition Approved Successfully");
        const temp = { ...projectDetails, status: "Approved" };
        setProjectDetails(temp);
      })
      .catch((err) => {
        setErrorMessage("Error in Updating Status");
      });
  };

  const sentEmail = () => {
    navigate(`/admin/sentEmail/${projectDetails.projectId}`);
  };

  return (
    <Box width={"100%"}>
      <Button
        disableElevation
        disableRipple
        sx={{ color: "black" }}
        startIcon={<KeyboardBackspaceIcon />}
        onClick={backTab}
      >
        Back
      </Button>
      <Box p={3}>
        {errorMessage.length > 0 || successMessage.length > 0 ? (
          <Box my={2}>
            {errorMessage.length > 0 && (
              <Alert severity="error" onClose={() => setErrorMessage("")}>
                {errorMessage}
              </Alert>
            )}
            {successMessage.length > 0 && (
              <Alert severity="success" onClose={() => setSuccessMessage("")}>
                {successMessage}
              </Alert>
            )}
          </Box>
        ) : (
          <></>
        )}
        <Paper>
          <Box p={3} className={styles["paper-component"]}>
            <Box>
              <img src={ELGCImage} alt="ELGC Logo" style={{ width: 90 }} />
            </Box>
            <Box display={"flex"} border={"1px solid"}>
              <Box width={"68%"} borderRight={"1px solid"} p={1.5}>
                <Typography variant="h6">
                  EMIRATES LINK GENERAL CONTRACTING LLC
                </Typography>
                <Typography variant="body2" style={{ marginBottom: 5 }}>
                  P.O. BOX 32799, ABU DHABI, U.A.E.
                </Typography>
                <Typography variant="body2">
                  <span style={spanStyle}>T -</span> +971 2 6727226;{" "}
                  <span style={spanStyle}>Email :</span> emirates.link@elgc.ae
                </Typography>
              </Box>
              <Box p={1.5} width={"35%"} display={"flex"}>
                <Box ml={"10%"}>
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    Material Purchase Requisition
                  </Typography>
                  <Typography sx={{ marginLeft: 5 }}>
                    (Project Materials)
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box display={"flex"} mt={3}>
              <Box width={"68%"}>
                <Typography sx={{ marginBottom: 1 }}>
                  <span style={spanStyle}>To: </span>
                  {projectDetails.toName}
                </Typography>
                <Typography>
                  <span style={spanStyle}>Sub: </span>
                  {projectDetails.subject}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ marginBottom: 1 }}>
                  <span style={spanStyle}>Project: </span>
                  {projectDetails.name}
                </Typography>
                <Typography sx={{ marginBottom: 1 }}>
                  <span style={spanStyle}>Requisition No: </span>
                  {projectDetails.projectId}
                </Typography>
                <Typography>
                  <span style={spanStyle}>Date: </span>
                  {new Date(projectDetails.requisitionTime).toLocaleTimeString}
                </Typography>
              </Box>
            </Box>
            <Box marginY={2}>
              <Typography>
                Please Arrange for the supply of the following items:
              </Typography>
            </Box>
            <TableContainer component={"div"}>
              <Table
                sx={{ minWidth: 650, border: "1px solid grey" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", width: "10%" }}
                    >
                      SR No
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", width: "60%" }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", width: "20%" }}
                    >
                      Size
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: "bold", width: "10%" }}
                    >
                      Quantity
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {material.map((item, index) => {
                    return (
                      <TableRow key={item.itemId}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{item.description}</TableCell>
                        <TableCell align="left">{item.size}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box my={2}>
              <Typography>{projectDetails.remarks}</Typography>
            </Box>
            <Box my={2} display={"flex"}>
              <Box width={"68%"}>
                <Typography>
                  <span style={spanStyle}>Prepared By:</span>
                  <img src={ApproveImage} alt="sign" />
                </Typography>
              </Box>
              {projectDetails.status === "Approved" && (
                <Box>
                  <Typography>
                    <span style={spanStyle}>Approved By:</span>
                    <img src={orderedIamge} alt="sign" />
                  </Typography>
                </Box>
              )}
            </Box>
            <Box my={3}>
              <Button
                variant="contained"
                size="medium"
                onClick={() => window.print()}
              >
                Print
              </Button>
              {projectDetails.status === "Approved" ? (
                <Button
                  variant="contained"
                  size="medium"
                  color="success"
                  sx={{ marginLeft: 1.5 }}
                  onClick={sentEmail}
                >
                  Send to Supplier
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ marginLeft: 1.5 }}
                    onClick={approveRequisition}
                  >
                    Approved
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    sx={{ marginLeft: 1.5 }}
                    onClick={deleteRequisition}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default RequisitionDetails;
