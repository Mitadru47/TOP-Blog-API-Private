import React from "react";
import { isLoggedIn } from "../utils/auth";

import axios from "../utils/axios";
import { BLOG_API_PRIVATE_DASHBOARD } from "../utils/urls";

function handleSubmit(event){

    event.preventDefault();

    // Form Data Parsing

    const data = new FormData(event.currentTarget);

    const plainFormData = Object.fromEntries(data.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

    if(isLoggedIn()){

        axios.post("dashboard/post/" + plainFormData.post + "/comment/create", formDataJsonString)

            .then((response) => {
            
                if(response.data.status === "Success!"){
                
                    let message = document.getElementById("post-failed-info");

                    message.classList.remove("display-on");
                    message.classList.add("display-off");

                    window.location.href = BLOG_API_PRIVATE_DASHBOARD + response.data.url;
                }

                else if(responseBody === "Comment Added Successfully!"){

                    let message = document.getElementById("post-failed-info");

                    message.classList.remove("display-on");
                    message.classList.add("display-off");

                    window.location.href = BLOG_API_PRIVATE_DASHBOARD + "/post/" + plainFormData.post;
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

function CommentCreator({ post, comment }){

    return(
        
        <div id="comment-creator">

            <div id="form-container">

                <form onSubmit={handleSubmit}>
                    
                    <textarea id="body-input" name="body" cols="150" rows="4" placeholder="Comment" defaultValue={comment.body}></textarea>
                    
                    <br></br>
                
                    {
                        (comment.username) ? 
                            <input type="text" name="username" defaultValue={comment.username} readOnly></input> 
                            : <input type="text" name="username" defaultValue={post.author.username} readOnly></input>
                    }

                    {
                        (comment.email) ? 
                            <input id="email-input" type="text" name="email" defaultValue={comment.email} readOnly></input>
                            : <input id="email-input" type="text" name="email" defaultValue={post.author.email} readOnly></input>
                    }

                    {
                        (comment._id) &&
                            <input id="comment-input" type="text" name="comment"  defaultValue={comment._id} hidden></input>  
                    }

                    <input id="post-input" type="text" name="post"  defaultValue={post._id} readOnly></input>

                    {
                        (comment._id) ? 
                            <button id="submit-button" type="submit">Edit Comment</button> 
                            : <button id="submit-button" type="submit">Comment</button>
                    }

                    {
                        (comment._id) ?
                            <a id="cancel-button" href={"/dashboard" + comment.url}>Cancel</a> 
                            : <a id="cancel-button" href={"/dashboard"}>Cancel</a>
                    }

                    <div id="post-failed-info" className="display-off">Something went wrong. Please try again!</div>
            
                </form>

            </div>
        </div>
    );
}

export default CommentCreator;