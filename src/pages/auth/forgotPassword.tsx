/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import React from "react";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Api } from "../../modules/auth";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/loginImage.png"; 
import logo from "../../assets/logo.png";
import Grid from "@mui/system/Unstable_Grid";
interface ForgotPasswordProps {
  // Define props here if any
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  
 
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    getValues
  } = useForm({
    mode: "onBlur"
  });

  const onsubmit = async (values: any) => {
    console.log(values);
    const emailreset = localStorage.getItem("emailreset")
    
    try {
        const {data} = await Api.ResetPasswordConfirm({
          ...values,
          email:emailreset,
        })
        if(values.activation_code || values.password){
          navigate("/login") 
        }
        console.log(data);
        toast.success(data.detail)
        
    } catch (error:any) {
        toast.error(error.response.data.detail)
    }
  }
  

  return (
    <Box
    sx={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F5EFE1",
      height: "100vh",
    }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
      <Container component="main" sx={{ width: "100%", height: "100%", alignItems: "center" }}>
      <Grid
            container
            sx={{
              width: "100%",
              height: "564px",
              boxShadow: "0px 0px 100px 0px rgba(0, 0, 0, 0.10)",
              borderRadius: "30px",
              margin: "0 auto",
            }}
          >
            <Grid
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "55px 0 55px 0",
              }}
            >
              <img
                src={loginImage}
                alt="Login"
                style={{ width: "450px", height: "450px" }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
            <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
            borderRadius: "30px",
            background: "#FFF",
            // boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
            padding: "50px 20px 20px 20px",
          }}
          className={"box-signin"}
        >
          <Box>
                  <img
                    src={logo}
                    style={{ paddingTop: "0px" }}
                    width={157}
                    height={37}
                    alt=""
                  />
                </Box>
                <Box   sx={{ marginTop: "50px",color: "#000",
                fontFamily: "Inter,sans-serif",
                fontSize: "25px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal" }}> 
                Forgot Password
                </Box>
                <Box sx={{ marginTop: "24px",padding:"0 60px 0 60px" }}>
                <form
            className="form-group resume-box"
            onSubmit={handleSubmit(onsubmit)} 
            id="resetPassword"
            >
              
                  <Box sx={{marginTop:"10px"}}>
                    <input
                    className="login-form"
                    type="number"
                    placeholder="Activation code"
                    style={{
                      width: "100%",
                          padding: "16px 15px",
                          marginBottom: "10px",
                          borderRadius: "12px",
                          border: "1px solid #B5B5B5",
                          fontSize: "18px",
                          alignItems: "center",
                    }}
                    {...register("activation_code", {
                      required: "Activation code is required",
                      minLength: {
                        value: 4,
                        message: "Activation code must be at least 6 characters",
                      },
                    })}
                  />
                  {
                    errors.activation_code && (
                      <p style={{color:"red",}}>{`${errors.activation_code.message}`}</p>
                    )
                  }
                  <input
                    className="login-form"
                    type="password"
                    placeholder="New Password"
                    style={{
                      width: "100%",
                      padding: "16px 15px",
                      marginBottom: "10px",
                      borderRadius: "12px",
                      border: "1px solid #B5B5B5",
                      fontSize: "18px",
                      alignItems: "center",
                    }}
                    {...register("new_password", {
                      required: "Password required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {
                    errors.new_password && (
                      <p style={{color:"red",}}>{`${errors.new_password.message}`}</p>
                    )
                  }
                  <input
                    className="login-form"
                    type="password"
                    placeholder="Confirm Password"
                    style={{
                      width: "100%",
                          padding: "16px 15px",
                          marginBottom: "10px",
                          borderRadius: "12px",
                          border: "1px solid #B5B5B5",
                          fontSize: "18px",
                          alignItems: "center",
                    }}
                    {...register("confirm_password", {
                      required: "Confirm password is required",
                      validate: (value) =>
                      value === getValues("new_password") || "New Password must match"
                    })}
                  />
                   {errors.confirm_password && (
                    <p style={{color:"red"}}>{`${errors.confirm_password.message}`}</p>
                  )}
                  </Box>
              
              
              <Button
                type="submit"
                fullWidth
                form="resetPassword"
                variant="contained"
                sx={{
                marginTop: "36px",
                mb: 2,
                height: "50px",
                background: "#F5EFE1",
                boxShadow:"none",
                color:"#000",
                fontWeight:"600",
                fontSize:"15px",
                fontStyle: "normal",
                lineHeight: "normal",
                fontFamily:"Inter, sans-serif",
                "&:hover": {
                  background: "#F5EFE1",
                  boxShadow:"none",
                }
              }}
              onClick={handleSubmit(onsubmit)}
              >
                Change Password
              </Button>

               
              </form>
              
          </Box>
        </Box>
        </Grid>
        </Grid>
      </Container>
      </Grid>
    </Box>
  );
};

export default ForgotPassword;
