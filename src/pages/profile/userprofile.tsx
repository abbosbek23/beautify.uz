import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import Navbarprofile from "./components/navbarprofile";
import { IEntity } from "../../modules/auth/types";
// import { useNavigate } from "react-router-dom";
import { Api } from "../../modules/auth";
import userdefaultImage from "../../assets/userimageprofile.png";
import Typography from "@mui/material/Typography";

interface UserProfileProps {}

const UserProfile: FunctionComponent<UserProfileProps> = () => {
  const [userdata, setUserdata] = useState<IEntity.User>();
  // const navigate = useNavigate()
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
    <Box>
      <Navbarprofile />
      <span
        style={{
          display: "block",
          width: "94%",
          height: "1px",
          color: "#B5B5B5",
          backgroundColor: "#B5B5B5",
          margin:"0 auto"
        }}
      ></span>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Box
          sx={
            userdata?.image === null
              ? {
                  width: "120px",
                  height: "120px",
                  borderRadius: "100px",
                  backgroundColor: "#B5B5B5",
                  marginTop: "30px",
                  marginLeft: "40px",
                  marginRight: "24px",
                }
              : { width: "120px", height: "120px", borderRadius: "100px" }
          }
        >
          <img
            src={userdata?.image === null ? userdefaultImage : userdata?.image}
            style={{
              width: "100%",
              height: "100%",
              padding: "10px 5px 13px 18px",
              objectFit: "fill",
            }}
            alt="userimage"
          />
        </Box>
        <Box sx={{ marginLeft: "0px" }}>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Inter,sans-serif",
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              marginTop:"10px"
            }}
          >
            {userdata?.full_name}
          </Typography>
          <Typography
            sx={{
              color: "#B5B5B5",
              fontFamily: "Inter",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              marginTop:"10px"
            }}
          >
            {userdata?.address.region +
              " " +
              userdata?.address.district +
              " " +
              userdata?.address.mahalla +
              " " +
              userdata?.address.house}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
