import React from "react";
import { useState, useEffect } from "react";

async function getDashboard(setDashboardResponse){

    fetch("http://localhost:3000/index/dashboard", { mode: "cors" })

        .then((response) => response.json())
        .then((responseBody) => setDashboardResponse(responseBody))

        .catch((error) => console.log(error));
}

function Dashboard(){

    const [ dashboardResponse, setDashboardResponse ] = useState();
    useEffect(() => { getDashboard(setDashboardResponse); }, [] );

    if(dashboardResponse){

        return(
            <div>
                {dashboardResponse.posts.map((post) => <div>{post._id}</div>)}
            </div>
        );
    }
}

export default Dashboard;