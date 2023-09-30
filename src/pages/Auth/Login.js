import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserTextField from "../../components/common/UserTextField";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { baseUrl } from "../../constant";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit button");
    axios
      .post(`${baseUrl}/login`, { email: email, password: password })
      .then((res) => {
        localStorage.clear();
        const token = res.data.token;
        localStorage.setItem("user-token", token);
        localStorage.setItem("loggedIn", true);
        navigate("/admin/dashboard", { replace: true });
      })
      .catch((err) => {
        setErrorMessage("Invalid Email or Password");
      });
  };

  const handleChange = (label, value) => {
    console.log(label + " " + value);
    if (label === "Email") setEmail(value);
    else setPassword(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, ml: 2 }}>
              {errorMessage.length > 0 && (
                <Alert severity="error">{errorMessage}</Alert>
              )}
              <Box marginTop={3}>
                <UserTextField
                  label="Email"
                  heading="email"
                  handleChange={handleChange}
                  value={email}
                />
              </Box>
              <Box marginTop={3}>
                <UserTextField
                  label="Password"
                  heading="password"
                  handleChange={handleChange}
                  value={password}
                  type="password"
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
                fullWidth
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
