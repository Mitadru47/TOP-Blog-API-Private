import React, { useState } from "react";
import { useParams } from "react-router-dom";

import CommentDetail from "./CommentDetail";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

async function getCommentDetail(setCommentDetailResponse){

    const { postid, commentid } = useParams();

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem("token"));

    fetch("http://localhost:3000/dashboard/post/" + postid + "/comment/" + commentid, { mode: "cors", headers: headers })
        
        .then((response) => response.json())
        .then((responseBody) => setCommentDetailResponse(responseBody))

        .catch((error) => console.log(error))
}

function handleSubmit(event){

    event.preventDefault();

    // Form Data Parsing

    const data = new FormData(event.currentTarget);
    const plainFormData = Object.fromEntries(data.entries());
    
    // API Header Creation

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem("token"));

    if(isLoggedIn()){

        fetch("http://localhost:3000/dashboard" + plainFormData.url + "/delete", { 
            
                mode: "cors", 
                method: "POST", 
                
                headers: headers
            })

            .then((response) => response.json())
            .then((responseBody) => {
            
                if(responseBody.status === "Success!"){
                
                    let message = document.getElementById("post-failed-info");

                    message.classList.remove("display-on");
                    message.classList.add("display-off");

                    window.location.href = "http://localhost:5174/dashboard/post/" + responseBody.id;
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
        window.location.href = "http://localhost:5174/dashboard";
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