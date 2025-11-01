import { createBrowserRouter } from "react-router";
import App from "../App";
import Builder from "../pages/user/Builder";
import Signup from "../pages/authentication/Signup";
import Login from "../pages/authentication/Login";


const routes = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: Builder,
      }
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Signup,
    path: "/signup",
  }
  
]);

export default routes;
