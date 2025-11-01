import axios from "axios";
import { envs } from "../config/env.config";

export const  apiRequiest = async(method,route,data=null,headers={}) =>{
     try {
          const res = await axios({
               method,
               url :`${envs.VITE_BACKEND_URL}${route}`,
               data,
               headers,
               withCredentials : true
          })
          return res.data;
     } catch (error) {
          throw error;
     }
}

