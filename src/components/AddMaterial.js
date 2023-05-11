import React, { useState } from "react";
import { Box, Paper, Typography, Grid, Button, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import UserTextField from "./common/UserTextField";
import { baseUrl } from "../constant";
import axios from "axios";

const materials = [
  {
    description: "",
    size: "",
    quantity: 0,
  },
];

function AddMaterial({ projectId, handleTab }) {
  const [material, setMaterial] = useState(materials);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleChange = (label, value, heading, index) => {
    const temp = [...material];
    temp[index][heading] = value;
    setMaterial(temp);
  };

  const addItem = () => {
    setMaterial([...material, { description: "", size: "", quantity: "" }]);
  };

  const removeItem = () => {
    const temp = [...material];
    temp.pop();
    setMaterial(temp);
  };

  const handleSubmit = () => {
    console.log(material);
    const isCheck = material.filter((item) => {
      if (
        item.description.length === 0 ||
        item.size.length === 0 ||
        item.quantity.length === 0
      )
        return item;
    });
    console.log(isCheck);
    if (isCheck && isCheck.length > 0) {
      setInfoMessage("Fill Out All the Fields");
      return;
    }
    const body = {
      projectId: projectId,
      materials: material,
    };
    console.log(body);
    axios
      .post(`${baseUrl}/addMaterialDetails`, body)
      .then((res) => {
        handleTab(3, projectId);
      })
      .catch((err) => {
        setErrorMessage("Problem in Adding Materials");
      });
  };

  return (
    <Box p={3} width={"100%"}>
      <Paper>
        <Box p={3}>
          <Box
            display={"flex"}
            width={"95%"}
            justifyContent={"center"}
            marginTop={2}
            marginBottom={5}
          >
            <Typography variant="h5">Add Materials</Typography>
          </Box>
          {errorMessage.length > 0 || infoMessage.length > 0 ? (
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
              {infoMessage.length > 0 && (
                <Alert
                  severity="info"
                  onClose={() => {
                    setInfoMessage("");
                  }}
                >
                  {infoMessage}
                </Alert>
              )}
            </Box>
          ) : (
            <></>
          )}
          <Box marginLeft={3} noValidate component="form">
            <Grid container spacing={5} rowSpacing={4}>
              {material.map((item, index) => {
                return (
                  <>
                    <Grid item xs={12} md={4}>
                      <UserTextField
                        label="Description*"
                        heading="description"
                        handleChange={handleChange}
                        value={item.description}
                        index={index}
                        type="text"
                        width={"100%"}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <UserTextField
                        label="Size*"
                        heading="size"
                        handleChange={handleChange}
                        value={item.size}
                        width={"90%"}
                        type="text"
                        index={index}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <UserTextField
                        label="Quantity*"
                        heading="quantity"
                        handleChange={handleChange}
                        value={item.quantity}
                        type="Number"
                        width={"95%"}
                        index={index}
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
              <Button
                variant="contained"
                size="medium"
                sx={{ marginRight: 1 }}
                onClick={addItem}
              >
                Add Items
              </Button>
              <Button
                variant="contained"
                size="medium"
                disabled={material.length === 1}
                sx={{ marginRight: 1 }}
                onClick={removeItem}
              >
                Remove Item
              </Button>
              <Button variant="contained" size="medium" onClick={handleSubmit}>
                Save Materials
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddMaterial;
