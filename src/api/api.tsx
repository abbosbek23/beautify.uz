import { BASE_URL } from "../config";
import axios from "axios";
import { IRegisterdata, IVerifyemail} from "../interface";

export const registerData = async (body: IRegisterdata) => {
      try {
        const {data} = await axios.post(`${BASE_URL}/v1/users/register`,body);
        return {data,success:true} 
      } catch (error) {
        console.log(error);
        return {success:false}
      }  
}
export const verifyemail = async (body: IVerifyemail) => {
    try {
      const {data} = await axios.post(`${BASE_URL}/v1/users/activate-code`,body);
      return {data,success:true} 
    } catch (error) {
      console.log(error);
      return {success:false}
    }  
}

export const getCategory = async () => {
    try {
        const {data} = await axios.get(`${BASE_URL}/v1/category`)
        return {data,success:true}
    } catch (error) {
        console.log(error);
        return {success:false}
    }
}