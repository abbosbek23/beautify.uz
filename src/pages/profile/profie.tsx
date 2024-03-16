import { FunctionComponent } from "react";
import MasterProfile from './masterprofile';
import UserProfile from "./userprofile";

interface ProfileProps {
    
}
 
const Profile: FunctionComponent<ProfileProps> = () => {
    const roles = localStorage.getItem("roles")
    console.log(roles);
    
    return ( <>
       {
        roles ? <MasterProfile/>:<UserProfile/>
       }
       </>
     );
}
 
export default Profile;