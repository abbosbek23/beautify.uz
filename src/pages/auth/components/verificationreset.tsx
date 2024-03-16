/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/system";
import { FunctionComponent, useState } from "react";
import Typography from "@mui/material/Typography";
import forgotPasswordemail from "../../../assets/forgotPasswordemailImg.svg"
import toast from "react-hot-toast";
import { Api } from "../../../modules/auth";
import Button from "@mui/material/Button";
import Grid from "@mui/system/Unstable_Grid";
import loginImage from "../../../assets/loginImage.png"; 
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

interface VerificationresetProps {
    
}
 
const Verificationreset: FunctionComponent<VerificationresetProps> = () => {

    const [emailreset, setEmailreset] = useState("")
    const navigate = useNavigate()       

    const postEmailReset = async () => {
        try {
            const {data} = await Api.ResetPassword({email:emailreset})
            toast.success("Password reset code sent to your email.");
            console.log(data);
            localStorage.setItem("emailreset",emailreset)
            navigate("/forgotpassword")
        } catch (error:any) {
            const errorsaxios = await error.response.data.detail;
            toast.error(errorsaxios ? errorsaxios:"Email "+error.response.data.email[0])
            console.log(error);
            
            
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
                  <Typography sx={{width:"100%",fontSize:"16px",marginBottom:"32px"}}>
                    Enter your email for the verification process, we will send a four digit code
                    </Typography>
                    <input
                    className="login-form"
                    type="text"
                    placeholder="Email"
                    style={{
                      width: "100%",
                      padding: "16px 38px",
                      marginBottom: "10px",
                      borderRadius: "12px",
                      border: "1px solid #B5B5B5",
                      backgroundImage: `url('${forgotPasswordemail}')`,
                      backgroundRepeat: "no-repeat",
                      fontSize: "18px",
                      backgroundSize: "22px 22px",
                      backgroundPosition: "10px 15px",
                      alignItems: "center",
                    }}
                    onChange={(e)=>setEmailreset(e.target.value)}
                  />
                
                <Button
                  
                fullWidth
                variant="contained"
                sx={{
                  marginTop: "32px",
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
                onClick={postEmailReset}
                >
                  Reset Email
                  </Button> 
                  </Box>
                  </Box>
                  </Grid>
                  </Grid>
                  </Container>
                  </Grid>
    </Box> 
     );
}
 
export default Verificationreset;