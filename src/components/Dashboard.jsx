import React from "react";
import { useState, useEffect } from "react";

async function getDashboard(setDashboardResponse){

    fetch("http://localhost:3000/index/dashboard", { mode: "cors" })

        .then((response) => response.json())
        .then((responseBody) => setDashboardResponse(responseBody))

        .catch((error) => console.log(error));
}

function ListItem(props){

    return(

        <div className="list-item">

            <div className="item-title">
                {props.post.title}
            </div>

            <div className="item-timestamp">
                {props.post.formattedTimestamp}
            </div>

            <div className="item-publishStatus">
                {(props.post.publishStatus ? "Published" : "Unpublished")}
            </div>

        </div>
    );
}

function Dashboard(){

    let  index = 0;

    const [ dashboardResponse, setDashboardResponse ] = useState();
    useEffect(() => { getDashboard(setDashboardResponse); }, [] );

    if(dashboardResponse){

        return(
            
            <div id="list-container">

                {dashboardResponse.posts.map((post) => <ListItem key={index} index={index++} post={post}/>)}

            </div>
        );
    }
}

export default Dashboard;