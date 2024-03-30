/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from "react";
import MasterProfile from './masterprofile';
import UserProfile from "./userprofile";
import { Api } from "../../modules/auth";
import { IEntity } from "../../modules/auth/types";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
    
}
 
const Profile: FunctionComponent<ProfileProps> = () => {
    const roles = localStorage.getItem("roles")
    console.log(roles);
    const [userdata, setUserdata] = useState<IEntity.User>();
    const navigate = useNavigate()
    useEffect(() => {
      const getUserdata = async () => {
        try {
          const { data } = await Api.UserProfil();
          console.log(data);
          setUserdata(data);
        } catch (error) {
          console.log(error);
          localStorage.clear()
          navigate("/")
        }
      };
      getUserdata();
    }, []);


    return ( <>
       {
        userdata?.is_master ? <MasterProfile/>:<UserProfile/>
       }
       </>
     );
}
 
export default Profile;