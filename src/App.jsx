import { useContext } from "react"
import { Context } from "./controllers/context/AuthContext"
import Loader from "./components/additionals/Loader";
import CommonLayout from "./components/layout/commonLayout";



function App() {
  const {isLoading}=useContext(Context);
  if(isLoading){
    return <Loader />
  }
  return (
  <div className="mx-auto">
       <CommonLayout />
     </div>
  )
}

export default App
