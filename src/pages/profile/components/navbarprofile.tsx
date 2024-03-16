import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import { Api} from "../../../modules/auth";
import navbarbackIcon from "../../../assets/navbarbackIcon.svg"
import  Typography  from '@mui/material/Typography';
import { IEntity } from "../../../modules/auth/types";
import like from "../../../assets/LikeNavbar.svg"
import bookmark from "../../../assets/BookmarkNavbar.svg"
import settingsnavbar from "../../../assets/settingsnavbar.svg"
import { useNavigate } from "react-router-dom";
interface NavbarprofileProps {
    
}
 
const Navbarprofile: FunctionComponent<NavbarprofileProps> = () => {

    const [userdata,setUserdata] = useState<IEntity.User>()
    const navigate = useNavigate()
    useEffect(()=>{
      const getUserdata = async () => {  
          try {
            const {data} = await Api.UserProfil()
            console.log(data);
            setUserdata(data)
          } catch (error) {
            console.log(error);
          }
      }
      getUserdata()  
    },[])

    return ( 
<Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "30px", paddingRight: "30px",marginTop:"32px",marginBottom:"31px" }}>
    <img width={32} onClick={()=>navigate(-1)} style={{cursor:"pointer",marginLeft:"0px"}} height={32} src={navbarbackIcon} alt="backicon" />
    <Typography>
        {userdata?.username}
    </Typography>
    <Box sx={{width:"120px",display:"flex",alignItems:"center",justifyContent:"space-between",marginRight:"0px"}}>
        <img src={like} style={{cursor:"pointer"}}  width={32} height={32} alt="likepage" />
        <img src={bookmark} style={{cursor:"pointer"}}  width={32} height={32} alt="bookmarkpage" />
        <img src={settingsnavbar} style={{cursor:"pointer"}} width={32} height={32} alt="settingsprofile" />
    </Box>
</Box>

     );
}
 
export default Navbarprofile;