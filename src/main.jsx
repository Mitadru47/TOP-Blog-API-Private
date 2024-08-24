import "./styles/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";

import PostDetail from "./components/PostDetail.jsx";

import PostCreator from "./components/PostCreator.jsx";
import PostEditor from "./components/PostEditor.jsx";

const router = createBrowserRouter([

  {

    path: "/",
    element: <Dashboard />

  },

  {

    path: "/dashboard",
    element: <Dashboard />
  
  },

  {

    path: "/dashboard/post/create",
    element: <PostCreator />

  },

  {

    path: "/dashboard/post/:id",
    element: <PostDetail />

  },

  {
    path: "/dashboard/post/:id/edit",
    element: <PostEditor />
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <Header />
    <RouterProvider router={router} />

  </React.StrictMode>
);