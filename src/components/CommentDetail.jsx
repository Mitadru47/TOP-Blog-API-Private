import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

import Loader from "./Loader.jsx";
import axios from "../utils/axios";

let apiCallCount = 1;

async function getCommentDetail(setCommentDetailResponse, postid, commentid){

    console.log("CommentDetail - API Trigger #" + apiCallCount++);

    axios.get("dashboard/post/" + postid + "/comment/" + commentid)
    
        .then((response) => setCommentDetailResponse(response.data))
        .catch((error) => {
            
            console.log(error);
          
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Comment...";
    
            let errorElements = document.getElementsByClassName("error");
            errorElements[0].innerText = error;
        });
}

function CommentDetail({ headerless }){

    if(isLoggedIn()){

        const { postid, commentid } = useParams();
        const [commentDetailResponse, setCommentDetailResponse] = useState();

        useEffect(() => { 
    
            if(apiCallCount === 1)
                getCommentDetail(setCommentDetailResponse, postid, commentid);

            if(apiCallCount > 1){
         
                const intervalID = setInterval(() => {
                getCommentDetail(setCommentDetailResponse, postid, commentid);
            
                }, 5000);
                
                // Clean-Up Function
                return (() => { clearInterval(intervalID); });
            }
        });
        
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
            return headerless ? <div className="loader">Loading Comment...</div> : <Loader name="Comment"/>;
    }

    else
        return <Login />;
}

export default CommentDetail;