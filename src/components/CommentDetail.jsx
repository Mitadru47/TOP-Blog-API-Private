import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
                          
                            <div className="comment-timestamp-container">
                            
                                <div><strong>Created: </strong>{commentDetailResponse.comment.createdTimestamp}</div>
                                <div>{!(commentDetailResponse.comment.createdTimestamp === commentDetailResponse.comment.timestamp) 
                                    && (<p style={{margin:0}}><strong>Edited: </strong>{commentDetailResponse.comment.timestamp}</p>)}</div>
                            
                            </div>

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