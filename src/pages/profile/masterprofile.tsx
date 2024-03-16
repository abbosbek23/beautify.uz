import { Box } from "@mui/system";
import { FunctionComponent } from "react";
import Navbarprofile from "./components/navbarprofile";

interface MasterProfileProps {
    
}
 
const MasterProfile: FunctionComponent<MasterProfileProps> = () => {

    const masterRole = localStorage.getItem("roles")
    return ( <>
        { 
       masterRole  ? <Box>
        <Navbarprofile/>
       </Box>:""
     
        }
        </>
    );
}
 
export default MasterProfile;