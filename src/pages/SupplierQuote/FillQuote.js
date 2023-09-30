import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../constant";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import UserTextField from "../../components/common/UserTextField";
import axios from "axios";

const FillQuote = () => {
  const params = useParams();
  const [materials, setMaterials] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { projectId, id } = params;
    axios
      .get(`${baseUrl}/getRequisitions/${projectId}`)
      .then((res) => {
        setQuoteDetails(
          res.data.materials.map((item) => {
            return {
              itemId: item.itemId,
              unitPrice: 0,
              projectId,
              id,
            };
          })
        );
        setMaterials(res.data.materials);
      })
      .catch((err) => {
        setErrorMessage("Problem in Fetching Items");
      });
  }, []);

  const handleChange = (label, value, heading, index) => {
    const temp = [...quoteDetails];
    temp[index][heading] = value;
    setQuoteDetails(temp);
  };

  const handleSubmit = () => {
    axios
      .post(`${baseUrl}/submitQuote`, { quote: quoteDetails })
      .then((res) => {
        navigate("/elgc/thanksPage", { replace: true });
      })
      .catch((err) => {
        setErrorMessage("Problem in Submitting Quote");
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
            <Typography variant="h5">Fill Quote</Typography>
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
          <Box mx={2} component="form">
            <Grid container spacing={5} rowSpacing={4}>
              {materials.map((item, index) => {
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
                        handleChange={handleChange}
                        value={quoteDetails[index].unitPrice}
                        index={index}
                        type="Number"
                        width={"100%"}
                      />
                    </Grid>
                  </>
                );
              })}
            </Grid>
            <Box
              display={"flex"}
              mt={6}
              width={"95%"}
              justifyContent={"center"}
            >
              <Button variant="contained" size="medium" onClick={handleSubmit}>
                Save and Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default FillQuote;
