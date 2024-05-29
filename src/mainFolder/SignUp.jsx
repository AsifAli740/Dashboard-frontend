import { React, useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { contextVal } from "./context";
import "./index.css";
import { useForm } from "react-hook-form";
import { FormControl, MenuItem, Select } from "@mui/material";
import { ErrorShow } from "../styled";
import { BASE_URL } from "./constant";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({ handleClose, handleCloseEdit, edit, allData }) {
  const context = useContext(contextVal);

  const [signUpState, setSignUpState] = useState({});
  const [isSubmitBtnClicked, setIsSubmitBtnClicked] = useState(false);

  // useEffect(() => {
  //   let user = localStorage.getItem("user");
  //   user = JSON.parse(user);
  //   if (user) {
  //     setSignUpState({
  //       name: user.name,
  //       email: user.email,
  //     });
  //   }
  // }, []);

  const navigate = useNavigate();
  

  const fetchdata = async (data) => {
    try {
      setIsSubmitBtnClicked(true);

      const response = await axios.post(
        `${BASE_URL}register`,
        data
      );
      if (response.data.token) {
        let token = response.data.token;
        let user = response.data.user;

        let userData = JSON.stringify(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", userData);
        navigate("/dashboard");
      } else {
        context.setSnackbar({
          state: true,
          message: response.data.message,
        });
      }
    } catch (error) {
    }
  };

  const getLocalStorage=()=>{
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    return {
      token,user
    }
  }

  const onHandleUpdate = async (data) => {
    try {
      const {token,user}=getLocalStorage()
      let response = await axios.put(
        `${BASE_URL}update?id=${ edit ? edit._id : user["_id"]}`,
        data,
        {
          headers:{Authorization : "Bearer" +' '+ token}
        }

      );
      if (response.data.status === "success") {

      
        if(!edit || response.data.user._id===user._id){
        localStorage.removeItem(user);
        localStorage.setItem("user", JSON.stringify(response.data.user));}
        context.setUser(localStorage.getItem("user"));
        
        context.setSnackbar({
          state: true,
          message: response.data.message,
          severity: response.data.status,
        });
        if(allData && edit){
          allData()
        }
        edit ? handleCloseEdit(): handleClose();
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

  const location = useLocation();
  const path = location.pathname;
 

  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: error },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues:{
      name: signUpState?.name || user?.name,
      email: signUpState?.email || user?.email

    }
  });

  useEffect(()=>{
    if(edit){
      setSignUpState({
        name:edit.name,
        email: edit.email
      })
      reset({
        name:edit.name,
        email: edit.email
      })
    }else{
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      if(user){
        if(path === "/signup"){
          navigate("?dashboard")
        }
        setSignUpState({
          name: user.name,
          email: user.email
        })
      }
    }
  },[edit])

  const onSubmit = (data) => {
    fetchdata(data);
    getValues();
    reset();
    watch();
  };

  
  return (
    <ThemeProvider theme={defaultTheme}>


      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 10,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            borderRadius: 2,
            // border:"1px solid black",
            marginTop:"10px"
          }}
          >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={"black"}>
            {user ? "Update" : "sign up"}
          </Typography>
          <form onSubmit={handleSubmit(user ? onHandleUpdate : onSubmit)}>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    // value={signUpState?.name || ""}
                    autoFocus
                    {...register("name", {
                      required: true,
                    })}
                    />
                  {error?.name && error?.name?.type === "required" && (
                    <ErrorShow >
                      First Name is required*
                    </ErrorShow>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    // value={signUpState?.email || ""}
                    autoComplete="email"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-z0-9._%+-]+@[A-z0-9.-]+.[A-z]{2,4}$/i,
                        message: "Please enter a valid email*",
                      },
                    })}
                  />
                  {error?.email?.message ? (
                    <ErrorShow >{error?.email?.message}</ErrorShow>
                  ) : (
                    ""
                  )}
                </Grid>
                {user ? (
                  ""
                ) : (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register("password", {
                          required: true,
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                            minLength: 8,
                          },
                        })}
                      />
                      {error?.password &&
                        error?.password.type === "required" && (
                          <ErrorShow >
                            password is required*
                          </ErrorShow>
                        )}
                      {error?.password &&
                        error?.password.type === "minLength" && (
                          <ErrorShow>
                            password should be of 8 character
                          </ErrorShow>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        id="password_confirmation"
                        autoComplete="new-password"
                        {...register("password_confirmation", {
                          required: " confirm password is required",
                          validate: (value) =>
                            value === watch("password") ||
                          "confirm password didnot match",
                        })}
                      />{" "}
                      {error?.password_confirmation?.message ? (
                        <ErrorShow>
                          {error?.password_confirmation?.message}
                        </ErrorShow>
                      ) : (
                        ""
                      )}
                    </Grid>
                    {user ? "" : (

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        
                        <Select
                          disableUnderline
                          defaultValue={"selectRole"}
                          {...register("role", {
                            required: " confirm password is required",
                           
                          })}
                        >
                          <MenuItem value={"selectRole"}  disabled>
                            --Select Role--{" "}
                          </MenuItem>
                          <MenuItem value={"admin"}>Admin</MenuItem>
                          <MenuItem value={"user"}>User</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    )}
                  </>
                )}
              </Grid>
              {user ? (
                <Button
                type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={onHandleUpdate}
                >
                  Update Data
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={fetchdata}
                  >
                  Sign Up
                </Button>
              )}

              <Grid container justifyContent="flex-end">
                {Object.keys(signUpState).length > 0 ? (
                  ""
                ) : (
                  <Grid item>
                    <Link to="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                )}
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
