import React from "react";
import { useState, useEffect } from "react";

async function getDashboardResponse(setDashboardResponse) {
    
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem("token"));

    fetch("http://localhost:3000/dashboard", { mode: "cors", headers: headers})

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
                
                <div id="header-info-container">
                   
                    <div id="header-info">

                        <div id="tool-container">

                            <div id="create-post-container">
                                <a id="create-post" href="/dashboard/post/create">Create</a>
                            </div>

                        </div>

                        <div id="post-count-container"> 
                            <p id="post-count">Total Posts: {dashboardResponse.posts.length}</p>
                        </div>

                    </div>

                    <div id="author-container">
                        <a id="author" href={"/dashboard" + dashboardResponse.author[0].url}>{dashboardResponse.author[0].username}</a>
                    </div>

                </div>

            </div>
        );
    }

    else
        return <div className="loader">Loading Header...</div>;
}

export default Header;