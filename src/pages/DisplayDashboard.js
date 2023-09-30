import React, { useEffect, useState } from "react";
import MyEditor from "../components/MyEditor";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { baseUrl, supplierApiUrl, quoteLink } from "../constant";
import axios from "axios";
import AutoFillTextField from "../components/common/AutoFillTextField";
import UserTextField from "../components/common/UserTextField";
import { useNavigate, useParams } from "react-router-dom";

const generateTableHtml = (materials, projectId) => {
  let tableHtml = `
    <p>Dear Sir,</p>
    <p>Please Quote Your Price for the following</p>
    <table style="border: 1px solid;">
      <thead>
        <tr>
          <th align="left">S. No.</th>
          <th align="left">Description</th>
          <th align="left">Size</th>
          <th align="left">Quantity</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let i = 0; i < materials.length; i++) {
    tableHtml += `
      <tr style="border: 0;">
        <td align="left">${i + 1}</td>  
        <td align="left">${materials[i].description}</td>
        <td align="left">${materials[i].size}</td>
        <td align="left">${materials[i].quantity}</td>
      </tr>
    `;
  }

  tableHtml += `
      </tbody>
    </table>
    <a href=${quoteLink + "/" + projectId}>Submit your Quotation</a>
    <p><span style="font-weight: bold;">Thanks and Regards</span></p>
    <p><span style="font-weight: bold;">K R Muraly</span></p>
    <h1>Emirates Link General Contracting LLC</h1>
    <p>Tel : + 971 2 6727226</p>
    <p>P.O. Box – 32799 Abu Dhabi | United Arab Emirates</p>
    <p>Email : <a href="mailto:admin@elgc.ae">admin@elgc.ae</a> | <a href="http://www.elgc.ae" target="_blank">www.elgc.ae</a></p>
  `;

  return tableHtml;
};

const DisplayDashboard = () => {
  const [contentData, setContentData] = useState("");
  const [emails, setEmails] = useState([]);
  const [emailTo, setEmailTo] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [emailsLoading, setEmailsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const projectId = params.projectId;
    axios
      .get(`${baseUrl}/getRequisitions/${projectId}`)
      .then((res) => {
        const tableHtmlString = generateTableHtml(
          res.data.materials,
          params.projectId
        );
        setContentData(tableHtmlString);
        setIsLoading(true);
      })
      .catch((err) => {
        setErrorMessage("Problem in Fetching Materials");
      });
    axios
      .get(`${supplierApiUrl}/getSupplierEmails`)
      .then((res) => {
        setEmails(res.data.emails);
        console.log(res.data.emails);
        setEmailsLoading(true);
      })
      .catch((err) => {
        setErrorMessage("Problem in Fetching Emails");
      });
  }, []);

  const handleChange = (label, value) => {
    setSubject(value);
  };

  const sentEmail = () => {
    axios
      .post(`${baseUrl}/sentEmails`, {
        emailDetails: emailTo,
        subject: subject,
        mailBody: contentData,
      })
      .then((res) => {
        navigate(`/admin/pendingrequisition`);
      })
      .catch((err) => {
        setErrorMessage("");
      });
  };

  if (!isloading || !emailsLoading) return <div>Loading...</div>;

  if (contentData.length > 0)
    return (
      <Box width={"100%"} p={3}>
        <Paper>
          <Box p={3}>
            <Box mt={3} display={"flex"} justifyContent={"center"}>
              <Typography variant="h5">Send Quote Details</Typography>
            </Box>
            {errorMessage.length > 0 && (
              <Box p={3}>
                <Alert severity="error" onClose={() => setErrorMessage("")}>
                  {errorMessage}
                </Alert>
              </Box>
            )}
            <Box my={3}>
              <Typography variant="body2">To:</Typography>
              <AutoFillTextField
                emails={emails}
                setEmailTo={setEmailTo}
                emailTo={emailTo}
              />
            </Box>
            <Box mb={3} display={"flex"} justifyContent={"center"}>
              <UserTextField
                label="Subject"
                value={subject}
                heading="subject"
                width={"100%"}
                handleChange={handleChange}
              />
            </Box>
            <MyEditor
              contentData={contentData}
              setContentData={setContentData}
            />
            <Box my={3}>
              <Button
                variant="contained"
                color="success"
                size="medium"
                onClick={sentEmail}
              >
                Sent To Supplier
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
};

export default DisplayDashboard;
