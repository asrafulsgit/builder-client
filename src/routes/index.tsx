import { createBrowserRouter } from "react-router";
import App from "../App";
import Builder from "../pages/user/Builder";
import Signup from "../pages/authentication/Signup";
import Login from "../pages/authentication/Login";
import Auth_middleware from "../middleware/Auth_middleware";
import UnAuth_middleware from "../middleware/UnAuth_middleware";
import Dashboard from "../pages/user/Dashboard";
import Preview from "../pages/user/Preview";
import NotFound from "../components/additionals/NotFound";


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
      path : '/project/:id',
      element : <Auth_middleware> <Preview /></Auth_middleware>
      },
  {
    element: <UnAuth_middleware> <Login/> </UnAuth_middleware> ,
    path: "/login",
  },
  {
    element: <UnAuth_middleware> <Signup /> </UnAuth_middleware>,
    path: "/signup",
  },{
    path : '/404',
    Component : NotFound
  }
]);

export default routes;
