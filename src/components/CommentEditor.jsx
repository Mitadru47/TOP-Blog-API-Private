import React, { useState } from "react";
import { useParams } from "react-router-dom";

import CommentCreator from "./CommentCreator";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";
import axios from "../utils/axios";

async function getCommentDetail(setCommentDetailResponse){

    const { postid, commentid } = useParams();

    axios.get("dashboard/post/" + postid + "/comment/" + commentid)

        .then((response) => setCommentDetailResponse(response.data))
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