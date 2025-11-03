import { createBrowserRouter } from "react-router";
import App from "../App";
import Builder from "../pages/user/Builder";
import Signup from "../pages/authentication/Signup";
import Login from "../pages/authentication/Login";
import Auth_middleware from "../middleware/Auth_middleware";
import UnAuth_middleware from "../middleware/UnAuth_middleware";
import Dashboard from "../pages/user/Dashboard";


const routes = createBrowserRouter([
  {
    element: <Auth_middleware><App /></Auth_middleware>,
    path: "/",
    children: [
      {
        index: true,
        Component: Builder,
      },{
        path : '/dashboard',
        Component : Dashboard
      }
    ],
  },
  {
    element: <UnAuth_middleware> <Login/> </UnAuth_middleware> ,
    path: "/login",
  },
  {
    element: <UnAuth_middleware> <Signup /> </UnAuth_middleware>,
    path: "/signup",
  }
  
]);

export default routes;
