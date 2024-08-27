import "./styles/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";

import PostDetail from "./components/PostDetail.jsx";

import PostCreator from "./components/PostCreator.jsx";
import PostEditor from "./components/PostEditor.jsx";
import PostDelete from "./components/PostDelete.jsx";

import CommentDetail from "./components/CommentDetail.jsx";
import CommentEditor from "./components/CommentEditor.jsx";
import CommentDelete from "./components/CommentDelete.jsx";

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
    element: <PostCreator postDetailResponse={{post: [{ id: "", title:"", body: "" }]}}/>

  },

  {

    path: "/dashboard/post/:id",
    element: <PostDetail />

  },

  {

    path: "/dashboard/post/:id/edit",
    element: <PostEditor />

  },

  {

    path: "/dashboard/post/:id/delete",
    element: <PostDelete />

  },

  {

    path: "/dashboard/post/:postid/comment/:commentid",
    element: <CommentDetail />
    
  },

  {

    path: "/dashboard/post/:postid/comment/:commentid/edit",
    element: <CommentEditor />

  },

  {

    path: "/dashboard/post/:postid/comment/:commentid/delete",
    element: <CommentDelete />
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <Header />
    <RouterProvider router={router} />

  </React.StrictMode>
);