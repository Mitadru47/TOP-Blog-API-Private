import React from "react";
import { useState, useEffect } from "react";

async function getDashboardResponse(setDashboardResponse) {
    
    fetch("http://localhost:3000/dashboard", { mode: "cors" })

        .then((response) => response.json())
        .then((responseBody) => setDashboardResponse(responseBody))

        .catch((error) => console.log(error));
}

function Header(){

    const [ dashboardResponse, setDashboardResponse ] = useState();
    useEffect(() => { getDashboardResponse(setDashboardResponse); });

    if(dashboardResponse){

        return(

            <div id="top-nav">

                <div id="header-container">
                    <a id="header" href="/">Blog API</a>
                </div>
                
                <div id="header-info">

                    <div id="tool-container"> 
                        <a id="create-post" href="/dashboard/post/create">Create</a>
                    </div>

                    <div id="post-count-container"> 
                        <p id="post-count">Total Posts: {dashboardResponse.posts.length}</p>
                    </div>

                </div>

            </div>
        );
    }
}

export default Header;