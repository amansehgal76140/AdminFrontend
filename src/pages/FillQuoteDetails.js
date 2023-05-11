import React, { useEffect, useState } from "react";
import UserTextField from "../components/common/UserTextField";
import { Grid, Box, Typography, Button, Paper } from "@mui/material";
import { baseUrl } from "../constant";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const temp = {
  name: "",
  email: "",
  country: "",
  company: "",
  address: "",
  mobile: "",
  message: "",
};

function FillQuoteDetails() {
  const [supplierData, setSupplierData] = useState(temp);
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (label, value, heading) => {
    const temp = { ...supplierData };
    temp[heading] = value;
    setSupplierData(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectId = params.projectId;
    axios
      .post(`${baseUrl}/supplierQuoteDetails`, supplierData)
      .then((res) => {
        navigate(`/elgc/submit-details/${projectId}/${res.data.insertId}`, {
          replace: true,
        });
      })
      .catch((err) => {
        setErrorMessage("Problem In Updating Records");
      });
  };

  return (
    <Box p={3}>
      <Paper>
        <Box p={3}>
          <Box
            display={"flex"}
            width={"95%"}
            justifyContent={"center"}
            marginTop={2}
            marginBottom={5}
          >
            <Typography variant="h5">Submit Your Quotation</Typography>
          </Box>
          {errorMessage.length > 0 && (
            <Box marginY={2} marginX={3}>
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
          )}
          <Box mx={2} onSubmit={handleSubmit} component="form">
            <Grid container spacing={5} rowSpacing={4}>
              <Grid item xs={12} md={4}>
                <UserTextField
                  label="Contact Person Name*"
                  heading="name"
                  handleChange={handleChange}
                  value={supplierData.name}
                  type="text"
                  width={"100%"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UserTextField
                  label="Mobile*"
                  heading="mobile"
                  handleChange={handleChange}
                  value={supplierData.mobile}
                  width={"100%"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UserTextField
                  label="Email*"
                  heading="email"
                  handleChange={handleChange}
                  value={supplierData.email}
                  type="email"
                  width={"100%"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UserTextField
                  label="Country*"
                  heading="country"
                  handleChange={handleChange}
                  value={supplierData.country}
                  type="text"
                  width={"100%"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UserTextField
                  label="Company*"
                  heading="company"
                  handleChange={handleChange}
                  value={supplierData.company}
                  type="text"
                  width={"100%"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UserTextField
                  label="Address*"
                  heading="address"
                  handleChange={handleChange}
                  value={supplierData.address}
                  type="text"
                  width={"100%"}
                />
              </Grid>
              <Grid item xs={12}>
                <UserTextField
                  label="Message"
                  heading="message"
                  handleChange={handleChange}
                  value={supplierData.message}
                  type="text"
                  isTextArea={true}
                  width={"100%"}
                />
              </Grid>
            </Grid>
            <Box
              display={"flex"}
              mt={6}
              width={"95%"}
              justifyContent={"center"}
            >
              <Button type="submit" variant="contained" size="medium">
                Save and Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default FillQuoteDetails;
