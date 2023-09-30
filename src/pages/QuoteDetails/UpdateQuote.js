import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../constant";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import UserTextField from "../../components/common/UserTextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function UpdateQuote() {
  const [itemDetails, setItemDetails] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const Params = useParams();

  const handleChange = (label, value, heading, index) => {
    const temp = [...itemDetails];
    temp[index][heading] = value;
    setItemDetails(temp);
  };

  const handleUpdate = () => {
    axios
      .post(`${baseUrl}/updateQuotePrice`, { itemDetails, id: Params.id })
      .then((res) => {
        setSuccessMessage("Quote Price Updated Successfully");
        window.history.back();
      })
      .catch((err) => {
        setErrorMessage("Problem in Updating Quote Price");
      });
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/getQuoteDetails/${Params.id}`)
      .then((res) => {
        console.log(res.data.results);
        setItemDetails(res.data.results);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Problem in Fetching Details");
      });
  }, []);

  return (
    <Box p={3} width={"100%"}>
      <Paper>
        <Box p={2}>
          <Box display={"flex"} width={"100%"} justifyContent={"center"} mb={3}>
            <Typography variant="h5">Update Quote</Typography>
          </Box>
          {errorMessage.length > 0 || successMessage.length > 0 ? (
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
          <Box my={3}>
            <Typography variant="body1">Material Details</Typography>
            <Box my={3} component="form" noValidate>
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
            <Box display="flex" width="100%" justifyContent={"center"} pt={3}>
              <Button onClick={handleUpdate} variant="contained">
                Update Quote
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default UpdateQuote;
