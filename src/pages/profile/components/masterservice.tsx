import { Box, Container } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import { FunctionComponent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import masterprofile from "../../../assets/masterProfile.svg";
import line from "../../../assets/linemaster.svg";
import gender from "../../../assets/gender.svg";
import { IEntity } from "../../../modules/auth/types";
import { Api } from "../../../modules/auth";
import locationIcon from "../../../assets/locationIconProfile.svg"
import phoneIcon from "../../../assets/phoneIconProfile.svg"
import serviceIcon from "../../../assets/serviceIconProfile.svg"

interface MasterServiceProps {}

const MasterService: FunctionComponent<MasterServiceProps> = () => {
  const [userdata, setUserdata] = useState<IEntity.User>();

  useEffect(() => {
    const getUserdata = async () => {
      try {
        const { data } = await Api.UserProfil();
        console.log(data);
        setUserdata(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserdata();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

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
            spacing={2}
          >
            <Grid xs={12} sm={6}>
              <Box
                sx={{
                  width: "100%",
                  padding: "20px",
                  borderRadius: "18px",
                  border: "1px solid #B5B5B5",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    padding: "13px 160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                    border: "1px solid #B5B5B5",
                    borderRadius:"12px"
                  }}
                >
                  <img src={masterprofile} style={{marginRight:"8px"}} width={27} height={27} alt="" />
                  About me
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={gender}
                    width={24}
                    height={24}
                    style={{ marginLeft: "0px", marginRight: "8px" }}
                    alt="gender"
                  />
                  <Typography
                    sx={{
                      color: "#000",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "22px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    {userdata?.gender}
                  </Typography>
                </Box>
                <Box>
                  <img src={line} width="100%" height={1} alt="line" />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={locationIcon}
                    width={24}
                    height={24}
                    style={{ marginLeft: "0px", marginRight: "8px" }}
                    alt="gender"
                  />
                  <Typography
                    sx={{
                      color: "#000",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "22px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    {userdata?.address.region}
                  </Typography>
                </Box>
                <Box>
                  <img src={line} width="100%" height={1} alt="line" />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={phoneIcon}
                    width={24}
                    height={24}
                    style={{ marginLeft: "0px", marginRight: "8px" }}
                    alt="gender"
                  />
                  <Typography
                    sx={{
                      color: "#000",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "22px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    {userdata?.phone}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} sm={6}>
            <Box
                sx={{
                  width: "100%",
                  padding: "20px",
                  borderRadius: "18px",
                  border: "1px solid #B5B5B5",
                }}
              >
              <Typography
                  sx={{
                    width: "100%",
                    padding: "13px 100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFF",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                    border: "1px solid #B5B5B5",
                    borderRadius:"12px",
                    backgroundColor:"#E2A882"        
                  }}
                >
                  <img src={serviceIcon} style={{marginRight:"8px"}} width={27} height={27} alt="" />
                  Service Information
                </Typography>
                <Box>
                  <Box>
                      
                  </Box>
                </Box>
                <Box>
                  <img src={line} width="100%" height={1} alt="line" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Box>
  );
};

export default MasterService;
{
  /* <Box
    sx={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      
      height: "100vh",
    }}
  >
        <Grid container justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
  <Container component="main" sx={{ width: "100%", height: "100%", alignItems: "center" }}>
  <Grid container spacing={2} sx={{ width: "100%", margin: "0 auto" }}>
  <Grid
      container
     
      xs={12} // Take up full width on extra-small screens
      sm={6}  // Take up half of the width on small screens
      sx={{
        width: "100%",
        height: "277px",
        boxShadow: "0px 0px 100px 0px rgba(0, 0, 0, 0.10)",
        borderRadius: "30px",
        margin: "0 auto",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            width: "100%",
            padding: "13px 237px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            fontFamily: "Inter",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            border: "1px solid #B5B5B5",
          }}
        >
          <img src={masterprofile} width={27} height={27} alt="" />
          About me
        </Typography>
        <Box>
          <img src={gender} width={24} height={24} alt="gender" />
          <Typography>{userdata?.gender}</Typography>
        </Box>
        <Box>
          <img src={line} width="100%" height={1} alt="line" />
        </Box>
      </Box>
    </Grid>
    <Grid
      container
  
      xs={12} // Take up full width on extra-small screens
      sm={6}  // Take up half of the width on small screens
      sx={{
        width: "100%",
        height: "277px",
        boxShadow: "0px 0px 100px 0px rgba(0, 0, 0, 0.10)",
        borderRadius: "30px",
        margin: "0 auto",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            width: "100%",
            padding: "13px 237px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            fontFamily: "Inter",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            border: "1px solid #B5B5B5",
          }}
        >
          <img src={masterprofile} width={27} height={27} alt="" />
          About me
        </Typography>
        <Box>
          <img src={gender} width={24} height={24} alt="gender" />
          <Typography>{userdata?.gender}</Typography>
        </Box>
        <Box>
          <img src={line} width="100%" height={1} alt="line" />
        </Box>
      </Box>
    </Grid>
    </Grid>
   

    
  </Container>
</Grid>
</Box> */
}
