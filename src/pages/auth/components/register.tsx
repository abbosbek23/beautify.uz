/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Container } from "@mui/system";
import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../../modules/auth";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import { ActiveCode } from "../../../modules/auth/api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import loginImage from "../../../assets/loginImage.png";
import Grid from "@mui/system/Unstable_Grid";
// import {OutlinedInput, InputAdornment,IconButton} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "../index.css";

interface registerProps {}

const Register1step: FunctionComponent<registerProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  // const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const [activeCodes, setactiveCodes] = useState<number | undefined>(undefined);
  const [emailverification, setemailverification] = useState(false);
  const navigate = useNavigate();

  const onsubmit = async (values: any) => {
    const selectedRoles = localStorage.getItem("roles");
    try {
      toast.success("Activation code sent to your email");
      if (values.email) {
        const { data } = await Api.Register({
          ...values,
          is_master: selectedRoles,
        });

        toast.success(data ? "Register 1 step is completed" : "");
        setEmail(values.email);
        setemailverification(true);
      }
    } catch (error: any) {
      setemailverification(false);
      const email = error.response.data?.email;
      const username = error.response.data?.username;
      if (email) {
        toast.error(email);
      }
      if (username) {
        toast.error(username);
      }
      console.log(error);
    }
    setactiveCodes(values.activate_code);
  };

  const activeCode = async () => {
    const activatsiyacode = activeCodes;
    try {
      const { data } = await ActiveCode({
        email,
        activate_code: activatsiyacode,
      });
      console.log(data);
      if (data) {
        localStorage.setItem("access", data.access_token);
        navigate("/register2step");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5EFE1",
          height: "100vh",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Container
            component="main"
            sx={{ width: "100%", height: "100%", alignItems: "center" }}
          >
            <Grid
              container
              sx={{
                width: "100%",
                height: "590px",
                boxShadow: "0px 0px 100px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "30px",
                margin: "0 auto",
              }}
            >
              <Grid xs={12} sm={6}>
                <Box
                  className={
                    emailverification
                      ? "emailverification box-signin"
                      : "emailverification2 box-signin"
                  }
                  height="100%"
                >
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ marginTop: "32px" }}
                  >
                    Sign Up
                  </Typography>

                  <Box
                    sx={{
                      marginTop: "42px",
                      paddingLeft: "60px",
                      paddingRight: "60px",
                    }}
                  >
                    <form
                      className="form-group resume-box"
                      onSubmit={handleSubmit(onsubmit)}
                      id="register"
                    >
                      <input
                        className="login-form"
                        type="text"
                        {...register("full_name", {
                          required: "Full Name is required",
                          minLength: {
                            value: 2,
                            message: "Full name must be at least 2 characters",
                          },
                        })}
                        placeholder="Full Name"
                      />
                      {errors.full_name && (
                        <p
                          style={{ color: "red" }}
                        >{`${errors.full_name.message}`}</p>
                      )}
                      <input
                        {...register("email", {
                          required: "Email is required",
                          minLength: {
                            value: 8,
                            message: "Email must be at least 8 characters",
                          },
                        })}
                        className="login-form"
                        type="email"
                        placeholder="Email"
                      />
                      {errors.email && (
                        <p
                          style={{ color: "red" }}
                        >{`${errors.email.message}`}</p>
                      )}
                      <input
                        {...register("username", {
                          required: "username is required",
                          minLength: {
                            value: 4,
                            message: "Username must be at least 4 characters",
                          },
                        })}
                        className="login-form"
                        type="text"
                        placeholder="Username"
                      />
                      {errors.username && (
                        <p
                          style={{ color: "red" }}
                        >{`${errors.username.message}`}</p>
                      )}
                      <div style={{ position: "relative" }}>
                      <input
      {...register("password", {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      })}
      type={showPassword ? 'text' : 'password'}
      placeholder="Password"
      style={{
        width: "100%",
        marginBottom: "10px",
        padding: "14px 25px", // Adjust padding as needed
        borderRadius: "12px",
        border: "1px solid #B5B5B5",
        borderBottom:"1px solid #B5B5B5",
        fontSize: "16px",
        paddingRight: "40px", // Add space for the icon
        outline: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: "47%",
        right: "10px",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </div>
                      </div>
                      {errors.password && (
                        <p
                          style={{ color: "red" }}
                        >{`${errors.password.message}`}</p>
                      )}
                      {emailverification ? (
                        <>
                          {" "}
                          <input
                            {...register("activate_code", {
                              required: "Activation code is required",
                              minLength: {
                                value: 6,
                                message:
                                  "Activation code must be at least 6 characters",
                              },
                            })}
                            onChange={(e) =>
                              setactiveCodes(parseInt(e.target.value))
                            }
                            style={{
                              background: "#FFF",
                              marginTop: "14px",
                              width: "100%",
                              padding: "16px 22px",
                              borderRadius: "12px",
                              border: "1px solid #B5B5B5",
                            }}
                            type="number"
                            placeholder="Activation Code"
                          />
                          {errors.activate_code && (
                            <p
                              style={{ color: "red" }}
                            >{`${errors.activate_code.message}`}</p>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </form>
                    {emailverification ? (
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          marginTop: "30px",
                          height: "50px",
                          background: "#F5EFE1",
                          color: "#000",
                          boxShadow: "none",
                          fontWeight: "600",
                          fontSize: "15px",
                          fontStyle: "normal",
                          lineHeight: "normal",
                          fontFamily: "Inter, sans-serif",
                          "&:hover": {
                            background: "#F5EFE1",
                            boxShadow: "none",
                          },
                        }}
                        onClick={activeCode}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        fullWidth
                        form="register"
                        variant="contained"
                        sx={{
                          marginTop: "30px",
                          height: "50px",
                          background: "#F5EFE1",
                          color: "#000",
                          boxShadow: "none",
                          fontWeight: "600",
                          fontSize: "15px",
                          fontStyle: "normal",
                          lineHeight: "normal",
                          fontFamily: "Inter, sans-serif",
                          "&:hover": {
                            background: "#F5EFE1",
                            boxShadow: "none",
                          },
                        }}
                        onClick={handleSubmit(onsubmit)}
                      >
                        Verify Email
                      </Button>
                    )}
                    <Box
                      sx={{
                        marginTop: "20px",
                        color: "#B5B5B5",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        textAlign: "center",
                        alignItems: "center",
                      }}
                    >
                      Have an account?{" "}
                      <span
                        onClick={() => navigate("/login")}
                        style={{
                          color: "#E2A882",
                          cursor: "pointer",
                        }}
                      >
                        Log in here
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "55px 0 55px 0",
                  "@media (max-width:450px)":{display:"none"}
                }}
              >
                <img
                  src={loginImage}
                  alt="Login"
                  style={{ width: "450px", height: "450px" }}
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Box>
    </Box>
  );
};

export default Register1step;
