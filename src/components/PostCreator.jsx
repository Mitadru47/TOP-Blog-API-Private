import React from "react";
import { useState, useEffect } from "react";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

import Loader from "./Loader.jsx";
import axios from "../utils/axios";

import { BLOG_API_PRIVATE_DASHBOARD } from "../utils/urls";

let apiCallCount = 0;

async function getUser(setUserResponse){

    console.log("PostCreator - API Trigger #" + apiCallCount++);

    axios.get("dashboard/user")

        .then((response) => setUserResponse(response.data))
        .catch((error) => {
            
            console.log(error);
          
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Post Creator/Editor...";
    
            let errorElements = document.getElementsByClassName("error");
            errorElements[0].innerText = error;
        });
}

function handleSubmit(event){

    event.preventDefault();

    // Form Data Parsing

    const data = new FormData(event.currentTarget);

    const plainFormData = Object.fromEntries(data.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

    if(isLoggedIn()){

        axios.post("dashboard/post/create", formDataJsonString)

            .then((response) => {
            
                if(response.data.status === "Success!"){
                
                    let message = document.getElementById("post-failed-info");

                    message.classList.remove("display-on");
                    message.classList.add("display-off");

                    window.location.href = BLOG_API_PRIVATE_DASHBOARD + "/post/" + response.data.id;
                }

                else{

                    let message = document.getElementById("post-failed-info");
    
                    message.classList.remove("display-off");
                    message.classList.add("display-on"); 
                }
            })

            .catch((error) => console.log(error));
    }

    else
        window.location.href = BLOG_API_PRIVATE_DASHBOARD;
}

function PostCreator(props){

    if(isLoggedIn()){

        const [userResponse, setUserResponse] = useState();
        useEffect(() => { getUser(setUserResponse); }, []);

        if(userResponse){

            return(

                <div>

                    <Header />

                    <div id="post-creator">

                        <div id="form-container">

                            <form onSubmit={handleSubmit}>

                                <input type="text" name="title" id="title" placeholder="title" defaultValue={props.postDetailResponse.post[0].title}/>
                                <br></br>

                                <textarea rows="15" cols="150" type="text" name="body" id="body" placeholder="body" defaultValue={props.postDetailResponse.post[0].body}/>
                                <br></br>

                                <input type="text" name="timestamp" id="timestamp" value={new Date()} readOnly/>
                                <input type="text" name="author" id="author" value={userResponse[0].id} readOnly/>

                                <br></br>
                                <br></br>
            
                                <input type="text" name="id" id="id" defaultValue={props.postDetailResponse.post[0].id} hidden/>

                                {props.postDetailResponse.post[0].id ? 
                                <button type="submit" id="submit-button">Update Post</button> : <button type="submit" id="submit-button">Create Post</button>}

                                {props.postDetailResponse.post[0].id ? 
                                <a id="cancel-button" href={"/dashboard" + props.postDetailResponse.post[0].url}>Cancel</a> : <a id="cancel-button" href={"/dashboard"}>Cancel</a>}

                                <div id="post-failed-info" className="display-off">Something went wrong. Please try again!</div>

                            </form>

                        </div>
                        
                    </div>

                </div>
            );
        }

        else
            return <Loader name="Post Creator/Editor"/>;
    }

    else
        return <Login />;
}

export default PostCreator;