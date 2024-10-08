import React from "react";
import { useState, useEffect } from "react";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

import Loader from "./Loader.jsx";
import axios from "../utils/axios";

import { BLOG_API_PRIVATE_DASHBOARD } from "../utils/urls";

let apiCallCount = 1;

async function getDashboardResponse(setDashboardResponse){

    console.log("Dashboard - API Trigger #" + apiCallCount++);

    axios.get("dashboard")

        .then((response) => setDashboardResponse(response.data))
        .catch((error) => {
            
            console.log(error);
          
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Dashboard...";
    
            let errorElements = document.getElementsByClassName("error");
            errorElements[0].innerText = error;
        });
}

function handleSubmit(event){

    event.preventDefault();

    // Form Data Parsing

    const data = new FormData(event.currentTarget);
    const plainFormData = Object.fromEntries(data.entries());

    if(isLoggedIn()){
        
        axios.post("dashboard/post/" + plainFormData.url)
        
            .then((response) => {
            
                if(response.data.status === "Success!"){
                
                    let message = document.getElementById("publish-status-failed-info");

                    message.classList.remove("display-on");
                    message.classList.add("display-off");

                    window.location.href = BLOG_API_PRIVATE_DASHBOARD;
                }

                else{

                    let message = document.getElementById("publish-status-failed-info");
    
                    message.classList.remove("display-off");
                    message.classList.add("display-on"); 
                }
            })

            .catch((error) => console.log(error));
    }

    else
        window.location.href = BLOG_API_PRIVATE_DASHBOARD;
}

function ListItem(props){

    let color = "white";

    if(props.post.publishStatus === true)
        color = "#C3EDC0";

    else
        color = "#FFEEA9";

    return(

        <div className="list-item" id={"item-" + props.post.id} style={{backgroundColor: color}}>

            <div className="list-item-info">

                <div className="item-title">
                    <a href={"/dashboard" + props.post.url}>{props.post.title}</a>
                </div>

                <div className="item-timestamp">
                    Created: {props.post.formattedCreatedTimestamp}
                </div>

            </div>

            <div className="list-item-tools">

                <div className="item-timestamp">
                    {!(props.post.createdTimestamp === props.post.timestamp) && ("Last Edited: " + props.post.formattedTimestamp)}
                </div>

                <div className="item-edit">
                    <a href={"/dashboard" + props.post.url + "/edit"}>Edit</a>
                </div>

                <div className="item-delete">
                    <a href={"/dashboard" + props.post.url + "/delete"}>Delete</a>
                </div>

                <div className="item-publish-status-container">

                    <div className="item-publish-status">
                        
                        {(props.post.publishStatus ? 
                        
                            <form onSubmit={handleSubmit}>
                            
                                <input type="text" name="url" id="url" defaultValue={props.post._id + "/publishStatus/unpublish"} hidden/>

                                <button type="submit" className="publish-button" id={"publish-" + props.post._id}>
                                
                                    <span id="publish-primary">Published</span>

                                    <span id="publish-secondary">Unpublish?</span>
                                    <span id="publish-tertiary">Unpublishing..</span>
                                    
                                </button> 

                                <div id="publish-status-failed-info" className="display-off">Please try again!</div>

                            </form>
                            
                            : 
                            
                            <form onSubmit={handleSubmit}>

                                <input type="text" name="url" id="url" defaultValue={props.post._id + "/publishStatus/publish"} hidden/>

                                <button type="submit" className="unpublish-button" id={"unpublish-" + props.post._id}>
                                    
                                    <span id="unpublish-primary">Unpublished</span>

                                    <span id="unpublish-secondary">Publish?</span>
                                    <span id="unpublish-tertiary">Publishing..</span>
                                    
                                </button> 

                                <div id="publish-status-failed-info" className="display-off">Please try again!</div>

                            </form>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

function Dashboard(){

    if(isLoggedIn()){

        let  index = 0;

        const [ dashboardResponse, setDashboardResponse ] = useState();
        useEffect(() => { getDashboardResponse(setDashboardResponse); }, []);
        
        if(dashboardResponse){

            return(
                
                <div>

                    <Header />

                    <div id="list-container">
                        {dashboardResponse.posts.map((post) => <ListItem key={index} index={index++} post={post} />)}                 
                    </div>

                </div>
            );
        }

        else
            return <Loader name="Dashboard"/>;
    }

    else
        return <Login />;
}

export default Dashboard;