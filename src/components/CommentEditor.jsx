import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommentCreator from "./CommentCreator";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

import Loader from "./Loader.jsx";
import axios from "../utils/axios";

let apiCallCount = 1;

async function getCommentDetail(setCommentDetailResponse, postid, commentid){

    console.log("CommentEditor - API Trigger #" + apiCallCount++);

    axios.get("dashboard/post/" + postid + "/comment/" + commentid)

        .then((response) => setCommentDetailResponse(response.data))
        .catch((error) => {
            
            console.log(error);
          
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Comment Editor...";
    
            let errorElements = document.getElementsByClassName("error");
            errorElements[0].innerText = error;
        });
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
            return <Loader name="Comment Editor"/>;
    }

    else
        return <Login />;
}

export default CommentEditor;