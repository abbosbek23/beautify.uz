/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import React,{useState} from "react";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Api } from "../../modules/auth";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordProps {
  // Define props here if any
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  
  const [verifyEmailreset, setVerifyEmailreset] = useState(false);
  const [emailreset, setEmailreset] = useState("")
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
    console.log(emailreset);
    
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
  const postEmailReset = async () => {
    try {
        const {data} = await Api.ResetPassword({email:emailreset})
        toast.success("Password reset code sent to your email.");
        console.log(data);
        setVerifyEmailreset(true)
    } catch (error:any) {
        const errorsaxios = await error.response.data.detail;
        toast.error(errorsaxios ? errorsaxios:"Email "+error.response.data.email[0])
        console.log(error);
        
        
    }
  }

  return (
    <Box
      sx={{ width: "100%", height: "100vh", overflow: "scroll",overflowX:"hidden" }}
      className="login"
    >
      <Container component="main" sx={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            marginTop: "7%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "444px",
            height: "auto",
            borderRadius: "15px",
            background: "#FFF",
            boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
          }}
          height="100%"
          className={"box-signin"}
        >
          <Typography component="h1" className="forgotpassword" variant="h4" sx={{ marginTop: "24px" }}>
            Forgot Password
          </Typography>
          <Box
            
            sx={  verifyEmailreset ? {
              marginTop: "52px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }:{marginTop: "12px",
            paddingLeft: "30px",
            paddingRight: "30px",}}
          >
            <form
            className="form-group resume-box"
            onSubmit={handleSubmit(onsubmit)}
            id="resetPassword"
            style={verifyEmailreset ? { marginTop: "0px", padding: "0px 40px" }:{ marginTop: "20px", padding: "0px 40px" }}
            >
            <input
              className="login-form"
              type="email"
              required={true}
              placeholder="Email"
              style={{
                width: "100%",
                padding: "16px 22px",
                marginBottom: "10px ",
                borderRadius: "12px",
                border: "1px solid #B5B5B5",
              }}
              onChange={(e)=>setEmailreset(e.target.value)}
            />
            {
                verifyEmailreset ? (<Box><input
                    className="login-form"
                    type="text"
                    placeholder="Activation code"
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                      width: "100%",
                      padding: "16px 22px",
                      borderRadius: "12px",
                      border: "1px solid #B5B5B5",
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
                      marginTop: "10px",
                      marginBottom: "20px",
                      width: "100%",
                      padding: "16px 22px",
                      borderRadius: "12px",
                      border: "1px solid #B5B5B5",
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
                      marginTop: "10px",
                      marginBottom: "30px",
                      width: "100%",
                      padding: "16px 22px",
                      borderRadius: "12px",
                      border: "1px solid #B5B5B5",
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
                  </Box>):("")
            }
              {
                verifyEmailreset ? (
              <Button
                type="submit"
                fullWidth
                form="resetPassword"
                variant="contained"
                sx={{ marginTop:"20px", mb: 2, height:"50px",background:  "#625DD3"}}
              >
                Change Password
              </Button>

                ):(
                  <Button
                  type="submit"
                form="resetPassword"  
                fullWidth
                variant="contained"
                sx={{ marginTop:"20px", mb: 4, height:"50px",background:  "#625DD3"}}
                onClick={postEmailReset}
                >
                  Reset Email
                  </Button>  
                )
              }
              </form>
              
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
