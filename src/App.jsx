import { useContext } from "react"
import CommonLayout from "./components/layout/commonLayout"
import { Context } from "./controllers/context/AuthContext"



function App() {
  const {isLoading}=useContext(Context);
  return (
    isLoading ? 
      <div><h1>
        Loading....</h1></div>  
      : <div className="mx-auto">
       <CommonLayout />
     </div>
  )
}

export default App
