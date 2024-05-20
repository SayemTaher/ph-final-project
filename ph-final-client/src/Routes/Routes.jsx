import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    ],
  },
]);
