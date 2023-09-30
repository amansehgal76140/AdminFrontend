import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl, orderLink } from "../../constant";
import { Box, Paper, Button, Alert, Typography, Grid } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import UserTextField from "../../components/common/UserTextField";
import { useNavigate } from "react-router-dom";

function CreateOrder({ id, quoteDetails, setActiveTab }) {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [orderId, setOrderId] = useState(-1);
  const navigate = useNavigate();

  const handleChange = (label, value, heading, index) => {
    const temp = [...itemDetails];
    temp[index][heading] = value;
    setItemDetails(temp);
  };

  useEffect(() => {
    console.log(quoteDetails);
    axios
      .get(`${baseUrl}/getCompanyDetails/${id}`)
      .then((res) => {
        console.log(res.data.details);
        setCompanyDetails(res.data.details);

        const itemDetailsCopy = quoteDetails.filter((quote) => {
          if (quote.id === id) return { ...quote };
        });
        setItemDetails(itemDetailsCopy);
      })
      .catch((err) => {
        setErrorMessage("Error in Fetching Details");
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post(`${baseUrl}/createOrder`, { id })
      .then((res) => {
        const orderId = res.data.orderId;
        setOrderId(orderId);
        axios
          .post(`${baseUrl}/orderDetails`, {
            materials: itemDetails,
            orderId: orderId,
          })
          .then((res) => {
            console.log("Order Successfull");
            setSuccessMessage("Order Created Successfully");
            navigate("/admin/receiptarchive", { replace: true });
          })
          .catch((err) => {
            setErrorMessage("Problem in Inserting Order Details");
          });
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error in Creating Order");
      });
  };

  useEffect(() => {
    console.log("useEffect inside mail sender hook");
    if (orderId != -1) {
      if (!baseUrl.includes("localhost") && orderId != -1) {
        const htmlBody = `<a href=${
          orderLink + "/" + orderId + "/" + id
        }>View Order Details</a>`;

        axios
          .post(`${baseUrl}/sentEmails`, {
            emailDetails: [companyDetails[0].email, "sehgalaman445@gmail.com"],
            mailBody: htmlBody,
            subject: "View Order Details",
          })
          .then((res) => {
            console.log("Mail Sent Successfully");
          })
          .catch((err) => {
            console.log(err);
            console.log("Problem in sending Mail");
          });
      }
    }
  }, [orderId]);

  if (companyDetails.length === 0) return <div>Loading...</div>;

  return (
    <Box width={"100%"}>
      <Button
        disableElevation
        disableRipple
        sx={{ color: "black" }}
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => setActiveTab(0)}
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
          <Box p={3}>
            <Box my={3} display={"flex"} justifyContent={"center"}>
              <Typography variant="h5">Order Details</Typography>
            </Box>
            <Typography variant="h6">Company Details</Typography>
            <Box border={"1px solid grey"} borderRadius={1} p={2}>
              <Grid container spacing={1}>
                <Grid item md={2} xs={5}>
                  <Typography sx={{ mb: 1 }}>Contact Person Name</Typography>
                  <Typography sx={{ mb: 1 }}>Email</Typography>
                  <Typography sx={{ mb: 1 }}>Contact Number</Typography>
                  <Typography sx={{ mb: 1 }}>Company Name</Typography>
                  <Typography sx={{ mb: 1 }}>Country Name</Typography>
                  <Typography sx={{ mb: 1 }}>Address</Typography>
                  <Typography>Message</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography sx={{ mb: 1 }}>:-</Typography>
                  <Typography sx={{ mb: 1 }}>:-</Typography>
                  <Typography sx={{ mb: 1 }}>:-</Typography>
                  <Typography sx={{ mb: 1 }}>:-</Typography>
                  <Typography sx={{ mb: 1 }}>:-</Typography>
                  <Typography sx={{ mb: 1 }}>:-</Typography>
                  <Typography>:-</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ mb: 1 }}>
                    {companyDetails[0].name}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    {companyDetails[0].email}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    {companyDetails[0].mobile}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    {companyDetails[0].company}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    {companyDetails[0].country}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    {companyDetails[0].address}
                  </Typography>
                  <Typography>{companyDetails[0].message}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box my={3}>
              <Typography variant="h6">Material Details</Typography>
              <Box my={1} component="form" noValidate>
                <Grid container spacing={5} rowSpacing={4}>
                  {itemDetails.map((item, index) => {
                    return (
                      <>
                        <Grid item xs={12} md={5}>
                          <UserTextField
                            label="Description"
                            heading="Description"
                            value={item.description}
                            type="text"
                            readOnly={true}
                            width={"100%"}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <UserTextField
                            label="Size"
                            value={item.size}
                            width={"100%"}
                            readOnly={true}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <UserTextField
                            label="Quantity"
                            value={item.quantity}
                            width={"100%"}
                            readOnly={true}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <UserTextField
                            label="Unit Price"
                            heading="unitPrice"
                            value={item.unitPrice}
                            handleChange={handleChange}
                            index={index}
                            type="Number"
                            width={"100%"}
                          />
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
            </Box>
            <Box
              display={"flex"}
              width={"100%"}
              justifyContent={"center"}
              py={4}
              size="medium"
            >
              <Button variant="contained" onClick={handleSubmit}>
                Create Order
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default CreateOrder;
