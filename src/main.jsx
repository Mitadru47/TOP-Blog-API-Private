import "./styles/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";

const router = createBrowserRouter([

  {

    path: "/",
    element: <Dashboard />

  },

  {

    path: "/dashboard",
    element: <Dashboard />
  
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <Header />
    <RouterProvider router={router} />

  </React.StrictMode>
);