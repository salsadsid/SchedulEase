import DashboardLayout from "@/layout/DashboardLayout";
import MyAppointments from "@/pages/Dashboard/MyAppointments";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <MyAppointments />,
      },
    ],
  },
]);

export default router;

//TODO
/*
 implement errorElement
 remove unused css shadcn theme 
remove unused shadcn components : alert
*/
