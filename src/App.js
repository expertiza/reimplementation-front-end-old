import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Layout/Home";
import RootLayout from "./components/Layout/Root";
import Users from "./components/Users/Users";
import Roles from "./components/Roles/Roles";
import Institutions from "./components/Institutions/Institutions";
import Instructors from "./components/Instructors/Instructors";
import Administrators from "./components/Administrators/Administrators";
import SuperAdministrators from "./components/SuperAdministrators/SuperAdministrators";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <Users /> },
        { path: "roles", element: <Roles /> },
        { path: "institutions", element: <Institutions /> },
        { path: "administrators", element: <Administrators /> },
        { path: "super_administrators", element: <SuperAdministrators /> },
        { path: "instructors", element: <Instructors /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
