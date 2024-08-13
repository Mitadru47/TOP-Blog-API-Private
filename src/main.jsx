import "./styles/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <Header />
    <Dashboard />

  </React.StrictMode>
);