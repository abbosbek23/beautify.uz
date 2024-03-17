import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import Navbarprofile from "./components/navbarprofile";
import { IEntity } from "../../modules/auth/types";
import { Api } from "../../modules/auth";
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

  function getInitials(fullName: string): string {
    // Ism va familiyani bo'sh joylar orqali ajratib olamiz
    const names: string[] = fullName.split(' ');
    
    // Bosh harflarini olamiz
    const initials: string[] = names.map(name => name.charAt(0));
    
    // Harflarni birlashtiramiz va katta harf qilib qaytarib beramiz
    return initials.join('').toUpperCase();
}

// Userdataning to'g'ri tipini qo'llash
const initials: string = getInitials(userdata?.full_name || "");
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
      <Box sx={{ width: "100%", display: "flex", alignItems: "center",marginTop:"20px" }}>
        <Box
          sx={
            userdata?.image === null
              ? {
                  width: "120px",
                  height: "120px",
                  marginTop: "30px",
                  marginLeft: "40px",
                  marginRight: "24px",
                }
              : { width: "120px", height: "120px",  }
          }
        >
          {userdata?.image === null ? (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "15px",
        backgroundColor: "#B5B5B5",
        borderRadius: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          color: "#FFFFFF",
          fontSize: "48px",
        }}
      >
        {initials}
      </Typography>
    </div>
  ) : (
    <img
      src={userdata?.image}
      alt="userimage"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "100px",
      }}
    />
  )}
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
