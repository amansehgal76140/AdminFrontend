import React, { useEffect, useState } from "react";
import ELGCImage from "../../image/ELGC-Logo-removebg-preview-1.png";
import { Box, Paper, Typography, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../constant";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Button from "@mui/material/Button";
import CreateOrder from "./CreateOrder";
import GeneralManagerIamge from "../../image/Signatire2.png";

function RequisitionQuote() {
  const [errorMessage, setErrorMessage] = useState("");
  const [quoteDetails, setQuoteDetails] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [divs, setDivs] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [companyHeading, setComapnyHeading] = useState([]);
  const [id, setId] = useState(-1);
  const [activeTab, setActiveTab] = useState(0);
  const Params = useParams();
  const { projectId } = Params;

  useEffect(() => {
    axios
      .get(`${baseUrl}/getQuotationItems/${projectId}`)
      .then((res) => {
        const { details } = res.data;
        console.log(details[0].id - details[details.length - 1].id + 1);
        setQuoteDetails(details);
        const totalCompanies =
          details[0].id - details[details.length - 1].id + 1;
        const items = details.length / totalCompanies;
        setTotalItems(items);
        const temp = [];
        const temp1 = [];
        let value = 0;
        details.forEach((detail, index) => {
          value += detail.unitPrice * detail.quantity;
          if (index % items == items - 1) {
            temp1.push(value);
            value = 0;
          }
        });
        console.log(temp1);
        setTotalPrice(temp1);
        for (let i = 1; i <= 2 * totalCompanies; i++) {
          if (i % 2 != 0)
            temp.push(
              <TableCell key={i} align="left" sx={{ fontWeight: "bold" }}>
                Unit Price
              </TableCell>
            );
          else
            temp.push(
              <TableCell key={i} align="left" sx={{ fontWeight: "bold" }}>
                Total Price
              </TableCell>
            );
        }
        const temp2 = [];
        for (let i = 1; i <= totalCompanies; i++) {
          temp2.push(
            <TableCell colSpan={2} key={i}>
              Quote {i}
            </TableCell>
          );
        }
        setComapnyHeading(temp2);
        setDivs(temp);
      })
      .catch((err) => {
        console.log(err);
        console.log("Catch called");
        setErrorMessage("Error in Fetching Data");
      });
  }, []);

  const createOrder = (companyNumber) => {
    const id = quoteDetails[companyNumber * totalItems].id;
    setId(id);
    setActiveTab(1);
    console.log(id);
  };

  if (quoteDetails.length === 0) return <div>Loading....</div>;

  if (activeTab === 1)
    return (
      <CreateOrder
        id={id}
        quoteDetails={quoteDetails}
        setActiveTab={setActiveTab}
      />
    );

  return (
    <Box minWidth={"100%"}>
      <Box p={3}>
        {errorMessage.length > 0 && (
          <Box my={2}>
            <Alert severity="error" onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          </Box>
        )}
        <Paper>
          <Box p={3}>
            <Box>
              <img src={ELGCImage} alt="ELGC Logo" style={{ width: 90 }} />
            </Box>
            <Box display={"flex"} border={"1px solid"}>
              <Box width={"40%"} borderRight={"1px solid"} p={1.5}>
                <Typography variant="h6">
                  EMIRATES LINK GENERAL CONTRACTING LLC
                </Typography>
                <Typography variant="body2" style={{ marginBottom: 5 }}>
                  P.O. BOX 32799, ABU DHABI, U.A.E.
                </Typography>
              </Box>
              <Box p={1.5} width={"60%"} display={"flex"}>
                <Box ml={"10%"}>
                  <Typography variant="h4" sx={{ marginBottom: 1 }}>
                    Price Comparative Statement
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box my={3}>
              <Typography variant="body2">Project No- {projectId}</Typography>
            </Box>

            <TableContainer component={"div"}>
              <Table
                sx={{ minWidth: 650, border: "1px solid grey" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4}>Company Quotes</TableCell>
                    {companyHeading}
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      SR No
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

                    {divs}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quoteDetails.slice(0, totalItems).map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{item.description}</TableCell>
                        <TableCell align="left">{item.size}</TableCell>
                        <TableCell align="left">{item.quantity}</TableCell>
                        {quoteDetails.map((quote) => {
                          if (quote.itemId === item.itemId) {
                            return (
                              <>
                                <TableCell align="left">
                                  {quote.unitPrice}
                                </TableCell>
                                <TableCell align="left">
                                  {quote.unitPrice * quote.quantity}
                                </TableCell>
                              </>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5} sx={{ fontWeight: "bold" }}>
                      Total Price(Inclusive 5% Tax)
                    </TableCell>
                    {totalPrice.map((price, index) => {
                      return (
                        <TableCell
                          colSpan={2}
                          key={index}
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >
                          {1.05 * price}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ fontWeight: "bold" }}>
                      View Company Details and Order
                    </TableCell>
                    {totalPrice.map((price, index) => {
                      return (
                        <TableCell
                          colSpan={2}
                          key={index}
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >
                          <Button onClick={() => createOrder(index)}>
                            Create Order
                          </Button>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <Box display={"flex"} my={3}>
              <Typography>General Manager</Typography>
              <img src={GeneralManagerIamge} alt="General Manager Image" />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default RequisitionQuote;
