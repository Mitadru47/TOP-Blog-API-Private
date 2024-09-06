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

                            <form action={"http://localhost:3000/dashboard" + commentDetailResponse.comment.url + "/delete"} method="POST">

                                <button id="delete-button" type="submit">Delete</button>
                                <a id="cancel-button" href={"/dashboard" + commentDetailResponse.comment.url}>Cancel</a>

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