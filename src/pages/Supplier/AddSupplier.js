import React, { useEffect, useState } from "react";
import UserTextField from "../../components/common/UserTextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { supplierApiUrl } from "../../constant";
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
  file: [null],
};

function AddSupplier() {
  const [supplierData, setSupplierData] = useState(temp);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [mode, setMode] = useState("add");
  const params = useParams();
  let location = useLocation();

  const addFiles = () => {
    const temp = { ...supplierData };
    temp.file.push(null);
    setSupplierData(temp);
  };

  const removeFile = () => {
    const temp = { ...supplierData };
    temp.file.pop();
    setSupplierData(temp);
  };

  const handleChange = (label, value, heading) => {
    const temp = { ...supplierData };
    temp[heading] = value;
    setSupplierData(temp);
  };

  const handleFileChange = (e, index) => {
    console.log(e.target.files[0]);
    if (e.target.files[0].name.endsWith(".pdf"))
      if (e.target.files) {
        const temp = { ...supplierData };
        temp["file"][index] = e.target.files[0];
        console.debug(supplierData);
        console.debug(temp);
        setSupplierData(temp);
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, company, country, address, mobile, file } =
      supplierData;
    console.log(file);
    let formData = new FormData();
    file.forEach((currFile) => {
      formData.append("company_details", currFile);
    });
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("country_name", country);
    formData.append("company_name", company);
    formData.append("phone", mobile);

    axios({
      method: "post",
      url: `${supplierApiUrl}/addNewSupplier`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setErrorMessage("");
        setSupplierData(temp);
        setSuccessMessage("Supplier Added Successfully");
        setMode("redirect");
      })
      .catch((err) => {
        console.log(err);
        setSuccessMessage("");
        setErrorMessage("Problem in adding Data");
      });
  };

  const updateSupplier = (e) => {
    e.preventDefault();
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
      .post(`${supplierApiUrl}/updateSupplierDetails`, body)
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
        .get(`${supplierApiUrl}/getSupplier/${params.supplierId}`)
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
          {successMessage.length > 0 || errorMessage.length > 0 ? (
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
            </Box>
          ) : (
            <></>
          )}
          <Box
            marginLeft={3}
            component="form"
            onSubmit={mode === "add" ? handleSubmit : updateSupplier}
          >
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
              {mode === "add" &&
                supplierData.file.map((fileDetails, index) => {
                  return (
                    <Grid item xs={12} key={index}>
                      <UserTextField
                        label="Upload Company Details File*"
                        heading="file"
                        handleChange={handleFileChange}
                        value={fileDetails}
                        type="file"
                        index={index}
                        width={"95%"}
                      />
                    </Grid>
                  );
                })}
            </Grid>
            <Box
              display={"flex"}
              mt={6}
              width={"95%"}
              justifyContent={"center"}
            >
              {mode === "add" ? (
                <>
                  <Box mr={2}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={addFiles}
                      disabled={supplierData.file.length === 3}
                    >
                      Add Files
                    </Button>
                  </Box>

                  <Box mr={2}>
                    <Button
                      variant="contained"
                      size="small"
                      disabled={supplierData.file.length === 1}
                      onClick={removeFile}
                    >
                      Remove File
                    </Button>
                  </Box>

                  <Button variant="contained" size="small" type="submit">
                    Add Supplier
                  </Button>
                </>
              ) : (
                <Button variant="contained" size="small" type="submit">
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
