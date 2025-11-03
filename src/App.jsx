import { useContext } from "react"
import { Context } from "./controllers/context/AuthContext"
import Loader from "./components/additionals/Loader";
import Common_Layout from "./components/layout/Common_Layout";



function App() {
  const {isLoading}=useContext(Context);
  if(isLoading){
    return <Loader />
  }
  return (
  <div className="mx-auto">
       <Common_Layout />
     </div>
  )
}

export default App
