/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import {OutlinedInput, InputAdornment,IconButton} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';  
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Api } from "../../modules/auth";
import toast from "react-hot-toast";
import loginImage from "../../assets/loginImage.png";
import usernameImg from "../../assets/loginUsernameImg.svg";
import passwordImg from "../../assets/loginPasswordImage.svg";
import logo from "../../assets/logo.png";

interface LoginProps {
 
}


const Login: FunctionComponent<LoginProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm({
    mode: "onBlur",
    // resolver: zodResolver(signInSchema)
  });
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false); 
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  useEffect(()=>{
   document.body.style.backgroundColor = "#F5EFE1"
  },[])

  const onsubmit = async (values: any) => {
 

    try {
      const { data } = await Api.Login(values);
      if (data) {
        localStorage.setItem("access", data.access);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login or password is wrong")
    }
  };
  return (
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
                <Box   sx={{ marginTop: "30px",color: "#000",
                fontFamily: "Inter,sans-serif",
                fontSize: "25px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal" }}> 
                Login
                </Box>
          <Box  sx={{ marginTop: "32px" }}>
          <form
                    className="form-group resume-box"
                    onSubmit={handleSubmit(onsubmit)}
                    id="login"
                  >
              
              <div style={{ position: "relative" }}>
                      <input
                        {...register("username", {
                          required:"Username is required",
                          minLength: {
                            value: 4,
                            message: "Username must be at least 4 characters",
                          },
                        })}
                        className="login-form"
                        type="text"
                        placeholder="Username"
                        style={{
                          width: "100%",
                          padding: "16px 35px",
                          marginBottom: "10px",
                          borderRadius: "12px",
                          border: "1px solid #B5B5B5",
                          backgroundImage: `url('${usernameImg}')`,
                          backgroundRepeat: "no-repeat",
                          fontSize: "18px",
                          backgroundSize: "23px 23px",
                          backgroundPosition: "8px",
                          alignItems: "center",
                        }}
                      />
                    </div>
                    {errors.username && (
                    <p style={{color:"red",marginBottom:"20px"}}>{`${errors.username.message}`}</p>
                    )}
             
             <div style={{ position: "relative" }}>
                      <OutlinedInput
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        className="login-form passwordlogin"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        sx={{
                          marginTop: "20px",
                          marginBottom: "17px",
                          width: "100%",
                          padding: "0px 35px",
                          borderRadius: "12px",
                          border: "1px solid #B5B5B5",
                          borderBottom:0,
                          backgroundImage: `url('${passwordImg}')`,
                          backgroundRepeat: "no-repeat",
                          fontSize: "18px",
                          backgroundSize: "23px 23px",
                          backgroundPosition: "8px",
                          alignItems: "center",
                          '&::before': { 
                            content: '""',
                            borderBottom:"1px solid #B5B5B5",
                            borderBottomLeftRadius:"12px"
                           },
                           ':hover': {
                            borderColor:"#B5B5B5",
                            outline:"none" // theme.palette.primary.main
                          },
                          
                          
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </div>
               {errors.password && (
                <p style={{color:"red",marginBottom:"20px"}}>{`${errors.password.message}`}</p>
              )}
            </form>
            <Box style={{ textAlign: "right", marginRight: "10px" }}>
                    <Link
                      to={"/verificationemail"}
                      style={{ textDecoration: "none",fontSize:"18px", color: "#E2A882" }}
                    >
                      Forgot your Password
                    </Link>
                  </Box>
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              variant="contained"
              form="login"
              onClick={handleSubmit(onsubmit)}
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
            >
              Login
            </Button>
            <Typography sx={{color:"#B5B5B5",fontWeight: 400}}>
                  Don’t have an account?{" "}
                    <span
                      onClick={() => navigate("/auth")}
                      style={{
                        color: "#E2A882",
                        cursor:"pointer"
                      }}
                    >
                      Sign up here
                    </span>
                  </Typography>
          </Box>
        </Box>
        </Grid>
        </Grid>
      </Container>
      </Grid>
    </Box>
  );
};

export default Login;
