import "./styles/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";

import UserDetail from "./components/UserDetail.jsx";
import UserEditor from "./components/UserEditor.jsx";

import PostDetail from "./components/PostDetail.jsx";
import PostCreator from "./components/PostCreator.jsx";
import PostEditor from "./components/PostEditor.jsx";
import PostDelete from "./components/PostDelete.jsx";

import CommentDetail from "./components/CommentDetail.jsx";
import CommentEditor from "./components/CommentEditor.jsx";
import CommentDelete from "./components/CommentDelete.jsx";

import Login from "./components/LogIn.jsx";

const pollingFrequency = 5000;
console.log(`Polling Frequency: ${pollingFrequency / 1000}s`);

const router = createBrowserRouter([

  {

    path: "/login",
    element: <Login />

  },

  {

    path: "/",
    element: <Dashboard />

  },

  {

    path: "/dashboard",
    element: <Dashboard />
  
  },

  {

    path: "/dashboard/user",
    element: <UserDetail poll={ pollingFrequency }/>

  },

  {

    path: "/dashboard/user/edit",
    element: <UserEditor />

  },

  {

    path: "/dashboard/post/create",
    element: <PostCreator postDetailResponse={{post: [{ id: "", title: "", body: "" }]}}/>

  },

  {

    path: "/dashboard/post/:id",
    element: <PostDetail poll={ pollingFrequency } headerless={ false }/>

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
    element: <CommentDetail poll={ pollingFrequency } headerless={ false }/>
    
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

  <div>
    <RouterProvider router={router} />

  </div>
);