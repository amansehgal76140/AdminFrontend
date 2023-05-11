import React, { useState } from "react";
import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import UserTextField from "./common/UserTextField";
import { baseUrl } from "../constant";
import axios from "axios";

function MaterialRequisitionForm(props) {
  const [projectDetails, setProjectDetails] = useState({
    toName: "",
    name: "",
    subject: "",
    remarks:
      "If specified sizes are not available, please arrange for nearest alternative size " +
      "under intimation to the undersigned.",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleChange = (label, value, heading) => {
    const temp = { ...projectDetails };
    temp[heading] = value;
    setProjectDetails(temp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { toName, name, subject, remarks } = projectDetails;

    if (
      toName.length === 0 ||
      name.length === 0 ||
      subject.length === 0 ||
      remarks.length === 0
    ) {
      setInfoMessage("Please Fill out all the fields");
      return;
    }

    axios
      .post(`${baseUrl}/addProjectRequisition`, projectDetails)
      .then((res) => {
        props.handleTab(2, res.data.projectId);
      })
      .catch((err) => {
        setErrorMessage("Problem in Adding Project");
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
            <Typography variant="h5">Material Requisition Form</Typography>
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
              <Grid item xs={12} md={6}>
                <UserTextField
                  label="To*"
                  heading="toName"
                  handleChange={handleChange}
                  value={projectDetails.toName}
                  type="text"
                  width={"90%"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UserTextField
                  label="Project Name*"
                  type="text"
                  heading="name"
                  handleChange={handleChange}
                  value={projectDetails.name}
                  width={"90%"}
                />
              </Grid>
              <Grid item xs={12}>
                <UserTextField
                  label="Subject*"
                  heading="subject"
                  handleChange={handleChange}
                  value={projectDetails.subject}
                  type="text"
                  width={"95%"}
                />
              </Grid>
              <Grid item xs={12}>
                <UserTextField
                  label="Remarks*"
                  heading="remarks"
                  handleChange={handleChange}
                  value={projectDetails.remarks}
                  type="text"
                  width={"95%"}
                  isTextArea={true}
                />
              </Grid>
            </Grid>
            <Box
              display={"flex"}
              mt={6}
              width={"95%"}
              justifyContent={"center"}
            >
              <Button
                type="submit"
                variant="contained"
                size="medium"
                onClick={(e) => handleSubmit(e)}
              >
                Save and Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default MaterialRequisitionForm;
