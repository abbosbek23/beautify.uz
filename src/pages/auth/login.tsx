/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/system"
import { FunctionComponent } from "react"
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Api } from "../../modules/auth";
interface LoginProps {
    // search: string;
}

const Login: FunctionComponent<LoginProps> = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // reset,
  } = useForm({
    mode: "onBlur",
  });
    const navigate = useNavigate()

    const onsubmit = async (values: any) => {
      console.log(values);
      
      try {
          const {data} = await Api.Login(values)
          if(data){
            localStorage.setItem("access",data.access)
            navigate("/") 
          }
          console.log(data);
          
      } catch (error) {
          console.log(error);
          
      }
    }
    return(
<Box sx={{width:"100%",height:"100vh",overflow:"hidden"}} className="login">
            <Container component="main"  sx={{width:'100%',height:"100%"}}>
          <Box
            sx={{  
              marginTop:"6%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width:"544px",
              height:"518px",
              borderRadius:"15px",
              background: "#FFF",
              boxShadow:"0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
            }}
            height='100%'
            className={"box-signin"}
          >
            <Typography component="h1" variant="h4" sx={{marginTop:"54px"}}>
            Kirish
            </Typography>
            <Typography>
            Ro’yxatdan o’tmaganmisiz? <span onClick={()=>navigate("/register")} style={{color:"#625DD3",textDecorationLine: "underline"}}>Xoziroq o’ting</span> 
            </Typography>
            <Box component="form"  sx={{marginTop:"52px", paddingLeft:"30px",paddingRight:"30px" }}>
              <form
              className="form-group resume-box"
              onSubmit={handleSubmit(onsubmit)}
              id="login"
              style={{ marginTop: "20px",}}
              >
              <input 
              {...register("username", {
                // required: "Inputni to'ldir",
                minLength: {
                  value: 4,
                  message: "Kamida 4 harf",
                },
              })}
              className="login-form" type="text" placeholder="Foydalanuvchi nomi" style={{width: "100%",padding: "16px 22px",marginBottom:"10px ",borderRadius: "12px",border: "1px solid #B5B5B5"}}/>
              <input
              {...register("password", {
                // required: "Inputni to'ldir",
                minLength: {
                  value: 4,
                  message: "Kamida 4 harf",
                },
              })} 
              className="login-form" type="text" placeholder="Maxfiylik kodi" style={{marginTop:'20px',marginBottom:"30px",width: "100%",padding: "16px 22px",borderRadius: "12px",border: "1px solid #B5B5B5"}}/>
              </form>
                <Grid  xs>
                  <Link to={"/forgotpassword"} style={{textDecoration:'none',color:"#625DD3"}}>
                  Parolni unutdingizmi?
                  </Link>
                </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                form="login"
                sx={{ marginTop:"36px", mb: 2, height:"50px",background:  "#625DD3"}}
                onClick={handleSubmit(onsubmit)}
              >
                Kirish
              </Button>
              
            </Box>
          </Box>
        </Container>
        </Box>)
}

export default Login