import React, { useState } from "react";
import { useParams } from "react-router-dom";

import CommentCreator from "./CommentCreator";
import Header from "./Header";

async function getCommentDetail(setCommentDetailResponse){

    const { postid, commentid } = useParams();

    fetch("http://localhost:3000/dashboard/post/" + postid + "/comment/" + commentid, { mode: "cors" })
        
        .then((response) => response.json())
        .then((responseBody) => setCommentDetailResponse(responseBody))

        .catch((error) => console.log(error))
}

function CommentEditor(){

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

export default CommentEditor;