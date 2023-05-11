import React, { useEffect, useState } from "react";
import UserTextField from "../components/common/UserTextField";
import { Grid, Box, Typography, Button, Paper } from "@mui/material";
import { baseUrl } from "../constant";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";

const temp = {
  name: "",
  email: "",
  country: "",
  company: "",
  address: "",
  mobile: "",
  file: null,
};

function AddSupplier() {
  const [supplierData, setSupplierData] = useState(temp);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [infoMeassage, setInfoMessage] = useState("");
  const [mode, setMode] = useState("add");
  const params = useParams();
  let location = useLocation();

  const handleChange = (label, value, heading) => {
    const temp = { ...supplierData };
    temp[heading] = value;
    setSupplierData(temp);
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0].name.endsWith(".pdf"))
      if (e.target.files) {
        const temp = { ...supplierData };
        temp["file"] = e.target.files[0];
        console.log(supplierData);
        console.log(temp);
        setSupplierData(temp);
      }
  };

  const handleSubmit = () => {
    const { name, email, company, country, address, mobile, file } =
      supplierData;

    if (
      !name ||
      !email ||
      !company ||
      !address ||
      !country ||
      !mobile ||
      !file
    ) {
      setInfoMessage("Please fill Out All Fields");
      return;
    }

    let formData = new FormData();
    formData.append("company_details", supplierData.file);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("country_name", country);
    formData.append("company_name", company);
    formData.append("phone", mobile);

    axios({
      method: "post",
      url: `${baseUrl}/addNewSupplier`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setErrorMessage("");
        setInfoMessage("");
        setSupplierData(temp);
        setSuccessMessage("Supplier Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        setSuccessMessage("");
        setInfoMessage("");
        setErrorMessage("Problem in adding Data");
      });
  };

  const updateSupplier = () => {
    const body = {
      name: supplierData.name,
      email: supplierData.email,
      company_name: supplierData.company,
      country_name: supplierData.country,
      phone: supplierData.mobile,
      address: supplierData.address,
      supplierId: params.supplierId,
    };
    axios
      .post(`${baseUrl}/updateSupplierDetails`, body)
      .then((res) => {
        setSuccessMessage("Supplier Edited Successfully");
        setMode("redirect");
      })
      .catch((err) => {
        setErrorMessage("Problem in Editing Supplier");
      });
  };

  useEffect(() => {
    if (params.supplierId) {
      axios
        .get(`${baseUrl}/getSupplier/${params.supplierId}`)
        .then((res) => {
          setMode("edit");
          const temp = res.data.results[0];
          setSupplierData({
            ...temp,
            company: temp.company_name,
            country: temp.country_name,
            mobile: temp.phone,
          });
        })
        .catch((err) => {
          setMode("edit");
          setErrorMessage("Problem in Fetching Data");
        });
    }
  }, []);

  if (mode === "redirect") {
    return (
      <Navigate to="/admin/viewsupplier" state={{ from: location }} replace />
    );
  }

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
            <Typography variant="h5">
              {mode === "edit" ? "Edit Supplier" : "Add New Supplier"}
            </Typography>
          </Box>
          {successMessage.length > 0 ||
          errorMessage.length > 0 ||
          infoMeassage.length > 0 ? (
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
              {infoMeassage.length > 0 && (
                <Alert
                  severity="info"
                  onClose={() => {
                    setInfoMessage("");
                  }}
                >
                  {infoMeassage}
                </Alert>
              )}
            </Box>
          ) : (
            <></>
          )}
          <Box marginLeft={3} noValidate component="form">
            <Grid container spacing={5} rowSpacing={4}>
              <Grid item xs={12} md={6}>
                <UserTextField
                  label="Name*"
                  heading="name"
                  handleChange={handleChange}
                  value={supplierData.name}
                  type="text"
                  width={"90%"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UserTextField
                  label="Mobile*"
                  heading="mobile"
                  handleChange={handleChange}
                  value={supplierData.mobile}
                  width={"90%"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UserTextField
                  label="Email*"
                  heading="email"
                  handleChange={handleChange}
                  value={supplierData.email}
                  type="email"
                  width={"90%"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UserTextField
                  label="Country*"
                  heading="country"
                  handleChange={handleChange}
                  value={supplierData.country}
                  type="text"
                  width={"90%"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UserTextField
                  label="Company*"
                  heading="company"
                  handleChange={handleChange}
                  value={supplierData.company}
                  type="text"
                  width={"90%"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UserTextField
                  label="Address*"
                  heading="address"
                  handleChange={handleChange}
                  value={supplierData.address}
                  type="text"
                  width={"90%"}
                />
              </Grid>
              {mode === "add" && (
                <Grid item xs={12}>
                  <UserTextField
                    label="Upload Company Details File*"
                    heading="file"
                    handleChange={handleFileChange}
                    value={supplierData.file}
                    type="file"
                    width={"95%"}
                  />
                </Grid>
              )}
            </Grid>
            <Box
              display={"flex"}
              mt={6}
              width={"95%"}
              justifyContent={"center"}
            >
              {mode === "add" ? (
                <Button
                  variant="contained"
                  size="medium"
                  onClick={handleSubmit}
                >
                  Add Supplier
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="medium"
                  onClick={updateSupplier}
                >
                  Update Supplier
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddSupplier;
