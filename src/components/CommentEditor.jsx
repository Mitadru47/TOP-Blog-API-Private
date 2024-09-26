import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommentCreator from "./CommentCreator";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";
import axios from "../utils/axios";

let apiCallCount = 0;

async function getCommentDetail(setCommentDetailResponse, postid, commentid){

    console.log("CommentEditor - API Trigger #" + apiCallCount++);

    axios.get("dashboard/post/" + postid + "/comment/" + commentid)

        .then((response) => setCommentDetailResponse(response.data))
        .catch((error) => console.log(error))
}

function CommentEditor(){

    if(isLoggedIn()){

        const { postid, commentid } = useParams();
        const [commentDetailResponse, setCommentDetailResponse] = useState();

        useEffect(() => { getCommentDetail(setCommentDetailResponse, postid, commentid); }, []);

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