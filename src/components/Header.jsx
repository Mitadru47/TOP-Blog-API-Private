import React from "react";
import { useState, useEffect } from "react";

import Loader from "./Loader.jsx";
import axios from "../utils/axios";

let apiCallCount = 1;

async function getDashboardHeaderResponse(setDashboardHeaderResponse){

    console.log("Header - API Trigger #" + apiCallCount++);

    axios.get("dashboard/header")

        .then((response) => setDashboardHeaderResponse(response.data))
        .catch((error) => console.log(error));
}

function Header(){

    const [ dashboardHeaderResponse, setDashboardHeaderResponse ] = useState();
    useEffect(() => { getDashboardHeaderResponse(setDashboardHeaderResponse); }, []);

    if(dashboardHeaderResponse){

        return(

            <div id="top-nav">

                <div id="header-container">
                    <a id="header" href="/">Blog API</a>
                </div>
                
                <div id="header-info-container">
                   
                    <div id="header-info">

                        <div id="tool-container">

                            <div id="create-post-container">
                                <a id="create-post" href="/dashboard/post/create">Create</a>
                            </div>

                        </div>

                        <div id="post-count-container"> 
                            <p id="post-count">Total Posts: {dashboardHeaderResponse.count}</p>
                        </div>

                    </div>

                    <div id="author-container">
                        <a id="author" href={"/dashboard/user"}>{dashboardHeaderResponse.author}</a>
                    </div>

                </div>

            </div>
        );
    }

    else
        return <Loader />
}

export default Header;