import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "../Components/Menu";
import Order from "../Components/Order/Order";
import Error from "../Error/Error";

import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },
      {
        path: "/order",
        element: <Order></Order>,
      },
    ],
  },
]);
