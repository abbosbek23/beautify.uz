import { Box, Container } from "@mui/system"
import { FunctionComponent } from "react"
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
interface LoginProps {
    // search: string;
  }

const Login: FunctionComponent<LoginProps> = () => {
    
    const navigate = useNavigate()

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
              <input className="login-form" type="text" placeholder="Foydalanuvchi nomi" style={{width: "100%",padding: "16px 22px",marginBottom:"10px ",borderRadius: "12px",border: "1px solid #B5B5B5"}}/>
              <input className="login-form" type="text" placeholder="Maxfiylik kodi" style={{marginTop:'20px',marginBottom:"30px",width: "100%",padding: "16px 22px",borderRadius: "12px",border: "1px solid #B5B5B5"}}/>
              
                <Grid item xs>
                  <Link href="#" sx={{marginLeft:"72%",textDecoration:'none',color:"#625DD3"}} variant="body2">
                  Parolni unutdingizmi?
                  </Link>
                </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginTop:"36px", mb: 2, height:"50px",background:  "#625DD3"}}
              >
                Kirish
              </Button>
              
            </Box>
          </Box>
        </Container>
        </Box>)
}

export default Login