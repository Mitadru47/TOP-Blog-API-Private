import React, { useState } from "react";
import { useParams } from "react-router-dom";

import CommentCreator from "./CommentCreator";

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

function CommentEditor(){

    if(isLoggedIn()){

        const [commentDetailResponse, setCommentDetailResponse] = useState();
        getCommentDetail(setCommentDetailResponse);

        if(commentDetailResponse){

            return(

                <div>

                    <Header />
                    <CommentCreator post={commentDetailResponse.comment.post} comment={commentDetailResponse.comment}/>    
                
                </div>
            );

        }

        else
            return <div className="loader">Loading Comment Editor...</div>;
    }

    else
        return <Login />;
}

export default CommentEditor;