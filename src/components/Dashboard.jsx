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

            <div className="list-item-info">

                <div className="item-title">
                    <a href="">{props.post.title}</a>
                </div>

                <div className="item-timestamp">
                    Created: {props.post.formattedTimestamp}
                </div>

            </div>

            <div className="list-item-tools">

                <div className="item-edit">
                    <a href="">Edit</a>
                </div>

                <div className="item-delete">
                    <a href="">Delete</a>
                </div>

                <div className="item-publish-status-container">

                    <div className="item-publish-status">
                         
                        {(props.post.publishStatus ? 
                        
                            <a href={props.post.url + "/publish"} id="publish-button">
                            
                                <span id="publish-primary">Published</span>
                                <span id="publish-secondary">Unpublish?</span>
                                
                            </a> 
                            
                            : 
                            
                            <a href={props.post.url + "/unpublish"} id="unpublish-button">
                                
                                <span id="unpublish-primary">Unpublished</span>
                                <span id="unpublish-secondary">Publish?</span>
                                
                            </a> 
                        )}

                    </div>

                </div>

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