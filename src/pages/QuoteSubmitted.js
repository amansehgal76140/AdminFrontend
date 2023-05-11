import { Typography, Box } from "@mui/material";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

function QuoteSubmitted() {
  return (
    <Box
      display={"flex"}
      width={"100%"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CheckCircleRoundedIcon />
      <Typography variant="h5" sx={{ ml: 1 }}>
        Thank you For Submitting the Quote
      </Typography>
    </Box>
  );
}

export default QuoteSubmitted;
