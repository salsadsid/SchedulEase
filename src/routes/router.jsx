import DashboardLayout from "@/layout/DashboardLayout";

import ReceivedAppointments from "@/pages/Dashboard/ReceivedAppointments";
import SentAppointments from "@/pages/Dashboard/SentAppointments";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Users from "@/pages/Users";
import RequireAuth from "@/utils/RequireAuth";
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
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/appointment",
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "recieve",
        element: <ReceivedAppointments />,
      },
      {
        path: "sent",
        element: <SentAppointments />,
      },
    ],
  },
]);

export default router;
