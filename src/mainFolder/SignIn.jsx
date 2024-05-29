import { React, useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ImageWrapper, SignInWrapper } from "../styled";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { contextVal } from "./context";
import LoginIcon from "@mui/icons-material/Login";
import { BASE_URL } from "./constant";


export default function SignIn() {
  const context = useContext(contextVal);

  const [signInState, setSignInState] = useState({});

  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user) {
      if (path === "/") {
        navigate("/dashboard");
      }
    }
  });

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setSignInState({ ...signInState, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  const fetchdata = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}login`,
        signInState
      );
      if (response.data.status === "success") {
        navigate("/dashboard");
        let token = response.data.token;
        let user = response.data.user;
        let userData = JSON.stringify(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", userData);
        context.setSnackbar({
          state: true,
          message: response.data.message,
          severity: response.data.status,
        });
      } else {
        context.setSnackbar({
          state: true,
          message: response.data.message,
          severity: response.data.status,
        });
      }
    } catch (error) {
    }
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    // <Box sx={{display:"flex"}}>
    <ImageWrapper>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <SignInWrapper>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={"black"}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onhandleChange}
              autoFocus
            />
            <TextField
              
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onhandleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={fetchdata}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  <Typography
                    variant="span"
                    sx={{
                      color: "#0096ff",
                      ["&:hover"]: {
                        color: "#1565c0",
                      },
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="body1" color={"black"}> New User ?</Typography>
                <Link to="/signup" variant="body2" sx={{ color: "#0096ff" }}>
                  <Typography
                    variant="span"
                    sx={{
                      color: "#0096ff",
                      ["&:hover"]: {
                        color: "#1565c0",
                      },
                    }}
                  >
                    {" Create an account"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </SignInWrapper>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ImageWrapper>
    // <AsideImageWrapper >

    // </AsideImageWrapper>
    //  </ThemeProvider>
  );
}
