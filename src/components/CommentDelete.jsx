import React, { useState } from "react";
import { useParams } from "react-router-dom";

import CommentDetail from "./CommentDetail";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

import axios from "../utils/axios";
import { BLOG_API_PRIVATE_DASHBOARD } from "../utils/urls";

async function getCommentDetail(setCommentDetailResponse){

    const { postid, commentid } = useParams();

    axios.get("dashboard/post/" + postid + "/comment/" + commentid)
    
        .then((response) => setCommentDetailResponse(response.data))
        .catch((error) => console.log(error))
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

function CommentDelete(){

    if(isLoggedIn()){

        const [commentDetailResponse, setCommentDetailResponse] = useState();
        getCommentDetail(setCommentDetailResponse);

        if(commentDetailResponse){

            return(

                <div>

                    <Header />

                    <div id="delete-container">

                        <div id="delete-dialog">

                            <div id="delete-message">Are you sure?</div>

                            <br></br>

                            <div id="delete-info-lines">

                            <div className="delete-info">All info pertaining to the following comment will be permanently erased.</div>

                            </div>

                            <br></br>

                            <form onSubmit={handleSubmit}>

                                <input type="text" name="url" id="url" defaultValue={commentDetailResponse.comment.url} hidden/>

                                <button id="delete-button" type="submit">Delete</button>
                                <a id="cancel-button" href={"/dashboard" + commentDetailResponse.comment.url}>Cancel</a>

                                <div id="post-failed-info" className="display-off">Something went wrong. Please try again!</div>

                            </form>

                        </div>

                        <br></br>

                        <CommentDetail headerless={true}/>

                    </div>

                </div>
            );

        }

        else
            return <div className="loader">Loading Comment Delete Confirmation Dialog...</div>;
    }

    else
        return <Login />;
}

export default CommentDelete;