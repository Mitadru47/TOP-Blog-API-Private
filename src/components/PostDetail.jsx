import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Comments from "./Comments";
import CommentCreator  from "./CommentCreator";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

import Loader from "./Loader.jsx";
import axios from "../utils/axios";

import { BLOG_API_PRIVATE_DASHBOARD } from "../utils/urls";

let apiCallCount = 1;

async function getPostDetailResponse(setPostDetailResponse, id){

    console.log("PostDetail - API Trigger #" + apiCallCount++);

    axios.get("dashboard/post/" + id)

        .then((response) => setPostDetailResponse(response.data))
        .catch((error) => {
            
            console.log(error);
          
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Post...";
    
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

                    window.location.href = BLOG_API_PRIVATE_DASHBOARD + "/post/" + plainFormData.id;
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

function PostDetail({ poll, headerless }){

    if(isLoggedIn()){

        const { id } = useParams();
        const [postDetailResponse, setPostDetailResponse] = useState();

        useEffect(() => { 
    
            if(apiCallCount === 1)
                getPostDetailResponse(setPostDetailResponse, id); 

            if(apiCallCount > 1){
         
                const intervalID = setInterval(() => {
                getPostDetailResponse(setPostDetailResponse, id); 
            
                }, poll);
                
                // Clean-Up Function
                return (() => { clearInterval(intervalID); });
            }
        });

        if(postDetailResponse){
    
            const post = postDetailResponse.post;
            const comments = postDetailResponse.comments;

            let color = "white";

            if(post[0].publishStatus === true)
                color = "#C3EDC0";

            else
                color = "#FFEEA9";

            return(

                <div>

                    { !headerless && <Header />}

                    <div id="details">

                        <div id="post-detail-container" style={{backgroundColor: color}}>

                            <div id="post-detail-sub-container">

                                <div id="post-detail">

                                    <div className="post-title">
                                        <a href={"/dashboard" + post[0].url}>{post[0].title}</a>

                                    </div>

                                    <div className="post-body">{post[0].body}</div>

                                </div>

                                <div className="item-publish-status-container">

                                    
                                    <div className="item-publish-status">
                                        
                                        {(post[0].publishStatus ? 
                                        
                                            <form onSubmit={handleSubmit}>
                                            
                                                <input type="text" name="id" id="id" defaultValue={post[0]._id} hidden/>
                                                <input type="text" name="url" id="url" defaultValue={post[0]._id + "/publishStatus/unpublish"} hidden/>

                                                <button type="submit" className="publish-button" id={"publish-" + post[0]._id}>
                                                
                                                    <span id="publish-primary">Published</span>

                                                    <span id="publish-secondary">Unpublish?</span>
                                                    <span id="publish-tertiary">Unpublishing..</span>
                                                    
                                                </button> 

                                                <div id="publish-status-failed-info" className="display-off">Please try again!</div>

                                            </form>
                                            
                                            : 
                                            
                                            <form onSubmit={handleSubmit}>

                                                <input type="text" name="id" id="id" defaultValue={post[0]._id} hidden/>
                                                <input type="text" name="url" id="url" defaultValue={post[0]._id + "/publishStatus/publish"} hidden/>

                                                <button type="submit" className="unpublish-button" id={"unpublish-" + post[0]._id}>
                                                    
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

                            <div className="post-detail-footer">

                                <div className="post-detail-tools">

                                    <div className="item-edit">
                                        <a href={"/dashboard" + post[0].url + "/edit"}>Edit</a>
                                    </div>

                                    <div className="item-delete">
                                        <a href={"/dashboard" + post[0].url + "/delete"}>Delete</a>
                                    </div>

                                </div>

                                <div className="post-timestamp-container">
                                
                                    <div className="post-timestamp">{!(post[0].createdTimestamp === post[0].timestamp) && ("Edited: " + post[0].timestamp)}</div>
                                    <div className="post-timestamp">Created: {post[0].createdTimestamp}</div>
                                
                                </div>

                            </div>

                        </div>

                        <Comments comments={comments} />

                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    
                        <CommentCreator post={post[0]} comment={[{ _id: "", body: "", username: "", email: "" }]}/>

                    </div>
                    
                </div>
            );
        }

        else
            return headerless ? <div className="loader">Loading Post...</div> : <Loader name="Post"/>;
    }

    else
        return <Login />;
}

export default PostDetail;