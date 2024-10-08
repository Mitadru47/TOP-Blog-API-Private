import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";

import { useParams } from "react-router-dom";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

import Loader from "./Loader.jsx";
import axios from "../utils/axios";

import { BLOG_API_PRIVATE_DASHBOARD } from "../utils/urls";

let apiCallCount = 1;

async function getPostDetailResponse(setPostDetailResponse, id){

    console.log("PostEditor - API Trigger #" + apiCallCount++);

    axios.get("dashboard/post/" + id)
    
        .then((response) => setPostDetailResponse(response.data))
        .catch((error) => {
            
            console.log(error);
          
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Post Delete Confirmation Dialog...";
    
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

        axios.post("dashboard" + plainFormData.url + "/delete")
        
            .then((response) => {
            
                if(response.data.status === "Success!"){
                
                    let message = document.getElementById("post-failed-info");

                    message.classList.remove("display-on");
                    message.classList.add("display-off");

                    window.location.href = BLOG_API_PRIVATE_DASHBOARD;
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

function PostDelete(){

    if(isLoggedIn()){

        let { id } = useParams();
        const [postDetailResponse, setPostDetailResponse] = useState();

        useEffect(() => { getPostDetailResponse(setPostDetailResponse, id); }, []);

        if(postDetailResponse){

            return(

                <div>

                    <Header />

                    <div id="delete-container">

                        <div id="delete-dialog">
                        
                            <div id="delete-message">Are you sure?</div>

                            <br></br>

                            <div id="delete-info-lines">

                                <div className="delete-info">All info pertaining to the following post will be permanently erased.</div>
                                <div className="delete-info">All comment(s) & info pertaining to the comment poster(s) associated with this post will also be permanently erased.</div>

                            </div>

                            <br></br>

                            <form onSubmit={handleSubmit}>

                                <input type="text" name="url" id="url" defaultValue={postDetailResponse.post[0].url} hidden/>

                                <button id="delete-button" type="submit">Delete</button>
                                <a id="cancel-button" href={"/dashboard" + postDetailResponse.post[0].url}>Cancel</a>

                                <div id="post-failed-info" className="display-off">Something went wrong. Please try again!</div>

                            </form>

                        </div>

                        <br></br>

                        <PostDetail headerless={true} />

                    </div>

                </div>
            );
        }

        else
            return <Loader name="Post Delete Confirmation Dialog"/>;
    }

    else
        return <Login />;
}

export default PostDelete;