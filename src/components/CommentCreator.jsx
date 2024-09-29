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

    // Disabling Inputs to prevent Spamming

    let body = document.getElementById("body-input");
    let submit = document.getElementById("submit-button");

    body.disabled = true;
    submit.disabled = true;

    if(isLoggedIn()){

        axios.post("dashboard/post/" + plainFormData.post + "/comment/create", formDataJsonString)

            .then((response) => {
            
                if(response.data.status === "Success!"){

                    let message = document.getElementById("comment-failed-info");

                    message.classList.remove("display-on");
                    message.classList.add("display-off");

                    // After successful POST, removing previous comment body to prevent Spamming

                    body.value = "";
                }

                // Re-enabling Inputs after POST

                body.disabled = false;
                submit.disabled = false;
            })

            .catch((error) => {
                
                console.log(error);
            
                if(error.response.data.status === "Failure!"){
                
                    let message = document.getElementById("comment-failed-info");
    
                    message.classList.remove("display-off");
                    message.classList.add("display-on");

                    // Displaying error messages received from backend

                    let err = "";
                    
                    for(let i=0; i<error.response.data.error.length; i++){
                    
                        if(i === error.response.data.error.length - 1)
                            err = err + error.response.data.error[i].msg;

                        else
                            err = err + error.response.data.error[i].msg + "\n ";
                    }

                    message.innerText = err;

                    // Re-enabling Inputs after POST

                    body.disabled = false;
                    submit.disabled = false;
                }
            });
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
                        (comment._id) &&
                            <a id="cancel-button" href={"/dashboard" + comment.url}>Cancel</a>
                    }

                    <div id="comment-failed-info" className="display-off">Something went wrong. Please try again!</div>
            
                </form>

            </div>
        </div>
    );
}

export default CommentCreator;