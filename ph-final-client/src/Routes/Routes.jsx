import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import SignUp from "../Authentication/SignUp";

import Menu from "../Components/Menu";
import Order from "../Components/Order/Order";
import AddItem from "../Dashboard/AddItem";
import Dashboard from "../Dashboard/Dashboard";
import Mycart from "../Dashboard/Mycart";
import Users from "../Dashboard/Users";
import Error from "../Error/Error";

import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManageItem from "../Dashboard/ManageItem";
import UpdateItem from "../Dashboard/UpdateItem";
import Payment from "../Dashboard/Payment";
import PaymentHistory from "../Dashboard/PaymentHistory";
import UserHome from "../Dashboard/UserHome";
import AdminHome from "../Dashboard/AdminHome";
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
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "/dashboard/userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "/dashboard/adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/cart",
        element: <Mycart></Mycart>,
      },
      {
        path: "/dashboard/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <Users></Users>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addItems",
        element: (
          <AdminRoute>
            <AddItem></AddItem>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageItem",
        element: (
          <AdminRoute>
            <ManageItem></ManageItem>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/menu/${params.id}`),
      },
    ],
  },
]);
