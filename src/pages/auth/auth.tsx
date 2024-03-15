/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FunctionComponent,  useState } from "react";
import "./index.css";
import masterIcon from "../../assets/mastericon.png";
import clientIcon from "../../assets/clienticons.svg";
// import Register1step from "./components/register";
import {  useNavigate } from "react-router-dom";
// import Register2steps from "./components/register2step";
import loginImage from "../../assets/loginImage.png";
import Grid from "@mui/system/Unstable_Grid";

interface AuthProps {
  // search: string;
}

const Auth: FunctionComponent<AuthProps> = () => {
  

  
 
  // const [nextStep, setNextStep] = useState(false);
  const [selectRole, setSelectRole] = useState(0);
  const [selectedRoles, setSelectedRoles] = useState(false);
  const [roles, setRoles] = useState(false);
  
  const navigate = useNavigate();

  
  
  

  const selectedRole = (id: number) => {
    let roleString: string;
    if (id === 1) {
        setSelectedRoles(true);
        roleString = "true";
    } else {
        setSelectedRoles(false);
        roleString = "false";
    }
    console.log(selectedRoles);
    localStorage.setItem("roles", roleString);
    navigate("/register");
};

  console.log(selectedRoles);
  
  
  

  
  
  

  return (
    <>
      {!roles ? (
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
                    padding: "10px 20px 20px 20px",
                  }}
                  className={"box-signin"}
                >
                  
                  <Box   sx={{ marginTop: "30px",color: "#000",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "40px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal" }}> 
                  Sign Up
                  </Box>
                  <Box sx={{marginTop:"20px",textAlign:"center"}}>
                    <Typography sx={{fontSize: "23px",fontWeight:"500",color:"#B5B5B5"}}>
                    Select an account type
                    </Typography>
                  </Box>
            <Box component="form" sx={{ marginTop: "12px" }}>
                <Box onClick={()=> selectedRole(0)} marginTop={2}>
                  <Box onClick={() => setRoles(true)}>
                    <Box
                      sx={
                        selectRole === 0
                          ? {
                              width: "100%",
                              
                              border: "1px solid #E2A882",
                              padding: "20px",
                              cursor: "pointer",
                              borderRadius: "12px",
                            }
                          : {
                              width: "100%",
                              
                              border: "1px solid #B5B5B5",
                              padding: "20px",
                              cursor: "pointer",
                              borderRadius: "12px",
                            }
                      }
                      onClick={() => setSelectRole(0)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "20%",
                          alignItems: "center",
                          marginBottom:"10px",
                          marginLeft:"0px"
                        }}
                      >
                        <img
                          src={clientIcon}
                          width="42px"
                          height="42px"
                          alt="client"
                        />
                        <Typography sx={{fontSize: "22px",marginLeft:"10px"}}>Mijoz</Typography>
                      </Box>
                      <Typography sx={{fontSize:"18px",color:"#B5B5B5"}}>
                      As a client, you will be able to find the right specialists and register with them online.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box onClick={()=>selectedRole(1)}>
                  <Box onClick={() => setRoles(true)}>
                    <Box
                      sx={
                        selectRole === 1
                          ? {
                            width: "100%",
                            border: "1px solid #E2A882",
                            padding: "20px",
                            cursor: "pointer",
                            borderRadius: "12px",
                            marginTop:"10px"
                            }
                          : {
                            width: "100%",
                            border: "1px solid #B5B5B5",
                            padding: "20px",
                            cursor: "pointer",
                            borderRadius: "12px",
                            marginTop:"10px"
                            }
                      }
                      onClick={() => setSelectRole(1)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "20%",
                          alignItems: "center",
                          marginBottom:"10px",
                          marginLeft:"0px"
                        }}
                      >
                        <img
                          src={masterIcon}
                          width="42px"
                          height="42px"
                          alt="client"
                        />
                        <Typography sx={{fontSize: "22px",marginLeft:"10px"}}>Master</Typography>
                      </Box>
                      <Typography sx={{fontSize:"18px",color:"#B5B5B5"}}>
                      As a master, you use working tools to set your schedule, price list.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
             
             <Box   sx={{ marginTop: "20px",color: "#B5B5B5",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "22px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  textAlign:"center",
                  alignItems:"center"
                   }}> 
                  Have an account?{" "}
                  <span
                        onClick={() => navigate("/login")}
                        style={{
                          color: "#E2A882",
                          cursor:"pointer"
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
        // <Box padding={10} className="login">
        //   <Container component="main" sx={{ width: "100%", height: "100%" }}>
        //     <Box
        //       sx={{
        //         width: "896px",
        //         height: "484px",
        //         padding: "0 30px 30px 30px",
        //         borderRadius: "30px",
        //         background: "#FFF",
        //         boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
        //         display: "flex",
        //         flexDirection: "column",
        //         justifyContent: "center",
        //         textAlign: "center",
        //         alignItems: "center",
        //       }}
        //       className={"rolebasedIcon"}
        //     >
        //       <Box onClick={()=> selectedRole(0)} marginTop={2}>
        //         <Box onClick={() => setRoles(true)}>
        //           <Box
        //             sx={
        //               selectRole === 0
        //                 ? {
        //                     width: "800px",
        //                     height: "142px",
        //                     border: "1px solid #625DD3",
        //                     padding: "10px 42px",
        //                     cursor: "pointer",
        //                     borderRadius: "12px",
        //                   }
        //                 : {
        //                     width: "800px",
        //                     height: "142px",
        //                     border: "1px solid #B5B5B5",
        //                     padding: "10px 42px",
        //                     cursor: "pointer",
        //                     borderRadius: "12px",
        //                   }
        //             }
        //             onClick={() => setSelectRole(0)}
        //           >
        //             <Box
        //               sx={{
        //                 display: "flex",
        //                 width: "20%",
        //                 alignItems: "center",
        //               }}
        //             >
        //               <img
        //                 src={clientIcon}
        //                 width="42px"
        //                 height="42px"
        //                 alt="client"
        //               />
        //               <Typography variant="h5">Mijoz</Typography>
        //             </Box>
        //             <Typography variant="h6">
        //               Mijoz sifatida siz to'g'ri mutaxassislarni topishingiz va
        //               ularga onlayn ro'yxatdan o'tishingiz mumkin bo'ladi.
        //             </Typography>
        //           </Box>
        //         </Box>
        //       </Box>
        //       <Box onClick={()=>selectedRole(1)}>
        //         <Box onClick={() => setRoles(true)}>
        //           <Box
        //             sx={
        //               selectRole === 1
        //                 ? {
        //                     width: "800px",
        //                     height: "142px",
        //                     border: "1px solid #625DD3",
        //                     padding: "10px 42px",
        //                     marginTop: "10px",
        //                     cursor: "pointer",
        //                     borderRadius: "12px",
        //                   }
        //                 : {
        //                     width: "800px",
        //                     height: "142px",
        //                     border: "1px solid #B5B5B5",
        //                     padding: "10px 42px",
        //                     marginTop: "10px",
        //                     cursor: "pointer",
        //                     borderRadius: "12px",
        //                   }
        //             }
        //             onClick={() => setSelectRole(1)}
        //           >
        //             <Box
        //               sx={{
        //                 display: "flex",
        //                 width: "20%",
        //                 alignItems: "center",
        //               }}
        //             >
        //               <img
        //                 src={masterIcon}
        //                 width="42px"
        //                 height="42px"
        //                 alt="client"
        //               />
        //               <Typography variant="h5">Master</Typography>
        //             </Box>
        //             <Typography variant="h6">
        //               Master sifatida siz o'zingizning jadvalingizni, narxlar
        //               ro'yxatini o'rnatish uchun ishchi vositalardan
        //               foydalanasiz.
        //             </Typography>
        //           </Box>
        //         </Box>
        //       </Box>
              
        //     </Box>
        //   </Container>
        // </Box>
      ) : ("")}
    </>
  );
};

export default Auth;
