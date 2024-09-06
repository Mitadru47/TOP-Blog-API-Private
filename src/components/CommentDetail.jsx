import React, { useState } from "react";
import { useParams } from "react-router-dom";

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

function CommentDetail({ headerless }){

    if(isLoggedIn()){

        const [commentDetailResponse, setCommentDetailResponse] = useState();
        getCommentDetail(setCommentDetailResponse);

        if(commentDetailResponse){

            return(

                <div>

                    {!headerless && <Header />}

                    <div id = "comment-details">
                        
                        <div id="comment-header-container">

                            <div id="comment-header"><a href={"/dashboard" + commentDetailResponse.comment.post.url}>{commentDetailResponse.comment.post.title}</a>/Comment</div>

                            <div id="comment-tools">

                                <div className="item-edit">
                                    <a href={"/dashboard" + commentDetailResponse.comment.url + "/edit"}>Edit</a>
                                </div>

                                <div className="item-delete">
                                    <a href={"/dashboard" + commentDetailResponse.comment.url + "/delete"}>Delete</a>
                                </div>

                            </div>

                        </div>

                        <div>

                            <div id="comment-detail-body">{commentDetailResponse.comment.body}</div>

                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>

                            <div><strong>Alias: </strong>{commentDetailResponse.comment.username}</div>
                            <div><strong>Email: </strong>{commentDetailResponse.comment.email}</div>

                            <br></br>
                            <br></br>

                            <div><strong>Timestamp: </strong>{commentDetailResponse.comment.timestamp}</div>

                        </div>
                        
                    </div>

                </div>
            );
        }

        else
            return <div className="loader">Loading Comment...</div>;
    }

    else
        return <Login />;
}

export default CommentDetail;