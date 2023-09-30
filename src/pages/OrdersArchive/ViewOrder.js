import React, { useState, useEffect } from "react";
import ELGCImage from "../../image/ELGC-Logo-removebg-preview-1.png";
import ApprovedImage from "../../image/Signature1.png";
import OrderedImage from "../../image/Signature3(GeneralManager).png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import { Box, Paper, Alert, Typography, Grid } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../constant";
import { useParams } from "react-router-dom";

function ViewOrder() {
  const [errorMessage, setErrorMessage] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [materials, setMaterials] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${baseUrl}/orderProjectDetails/${params.id}`)
      .then((res) => {
        setProjectDetails(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Problem in Fetching Project Details");
      });

    axios
      .get(`${baseUrl}/getOrderedMaterial/${params.orderId}`)
      .then((res) => {
        setMaterials(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => {
        setErrorMessage("Problem in Fetching Material Details");
      });
  }, []);

  if (errorMessage.length > 0)
    return <Alert severity="error">{errorMessage}</Alert>;

  if (projectDetails.length === 0) return <div>Loading....</div>;

  let totalPrice = 0;

  return (
    <Box width={"100%"}>
      <Box p={3}>
        <Paper>
          <Box p={3}>
            <Box>
              <img src={ELGCImage} alt="ELGC Logo" style={{ width: 90 }} />
            </Box>

            <Box border={"1px solid grey"} borderRadius={1} p={2}>
              <Grid container spacing={1}>
                <Grid item md={2} xs={5}>
                  <Typography sx={{ mb: 1 }}>Project Name</Typography>
                  <Typography sx={{ mb: 1 }}>Project Id</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography sx={{ mb: 1 }}>:-</Typography>
                  <Typography sx={{ mb: 1 }}>:-</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ mb: 1 }}>
                    {projectDetails[0].name}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    {projectDetails[0].projectId}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box mt={3}>
              <Typography>Please Supply for the following:</Typography>
            </Box>

            <TableContainer component={"div"}>
              <Table
                sx={{ minWidth: 650, border: "1px solid grey" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      S/N
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Size
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Unit Price
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Total Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materials.map((material, index) => {
                    totalPrice += material.unitPrice * material.quantity;
                    return (
                      <TableRow key={material.itemId}>
                        <TableCell align="left">{index}</TableCell>
                        <TableCell align="left">
                          {material.description}
                        </TableCell>
                        <TableCell align="left">{material.size}</TableCell>
                        <TableCell align="left">{material.quantity}</TableCell>
                        <TableCell align="left">{material.unitPrice}</TableCell>
                        <TableCell align="left">
                          {material.unitPrice * material.quantity}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      Total Price
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                      {totalPrice}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      Total Price(Inclusive 5% Tax)
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                      {1.05 * totalPrice}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <Box my={2}>
              <Box display={"flex"}>
                <Typography>Approved By:-</Typography>
                <img src={ApprovedImage} alt="sign" />
              </Box>
            </Box>
            <Box my={2}>
              <Box display={"flex"}>
                <Typography>Ordered By:-</Typography>
                <img src={OrderedImage} alt="sign" />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default ViewOrder;
