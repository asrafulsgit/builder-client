import { createContext, useState } from "react";



const Context = createContext();


const AuthContext = ({children}) => {
    const [user,setUser] = useState(null)
  return (
     <Context.Provider value={{ user,setUser }}>
        {children}
     </Context.Provider>
  )
}

export default AuthContext;
