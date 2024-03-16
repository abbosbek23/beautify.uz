import { Box } from "@mui/system";
import { FunctionComponent } from "react";
import Navbarprofile from "./components/navbarprofile";

interface MasterProfileProps {
    
}
 
const MasterProfile: FunctionComponent<MasterProfileProps> = () => {

    
    return ( <Box>
        <Navbarprofile/>
        <hr/>
        <Box>
            Salom MasterProfile
        </Box>
        </Box>
    );
}
 
export default MasterProfile;