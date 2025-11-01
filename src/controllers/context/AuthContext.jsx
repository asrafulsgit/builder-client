import { createContext, useEffect, useState } from "react";
import { apiRequiest } from "../../utils/baseApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";



export const Context = createContext();


const AuthContext = ({children}) => {
   const [user,setUser] = useState(null);
   const [isLoading,setIsLoading] = useState(true);
    


    const userObserver = async()=>{
      try {
         const {data} = await apiRequiest('GET','/user/observer');
         setUser(data);
         setIsLoading(false);
      } catch (error) {
         setIsLoading(false);
      }
    }

    useEffect(()=>{
      userObserver()
    },[]);
  return (
     <Context.Provider value={{ user,setUser,setIsLoading, isLoading}}>
        {children}
     </Context.Provider>
  )
}

export default AuthContext;
