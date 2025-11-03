import { useContext } from "react"
import CommonLayout from "./components/layout/commonLayout"
import { Context } from "./controllers/context/AuthContext"
import Loader from "./components/additionals/Loader";



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
