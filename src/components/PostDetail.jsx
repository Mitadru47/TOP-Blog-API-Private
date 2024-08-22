import React from "react";
import { useParams } from "react-router-dom";

import Comments from "./Comments";
import CommentCreator  from "./CommentCreator";

async function getPostDetailResponse(setPostDetailResponse){

    let { id } = useParams();

    fetch("http://localhost:3000/dashboard/post/" + id, { mode: "cors" })

        .then((response) => response.json())
        .then((responseBody) => setPostDetailResponse(responseBody))

        .catch((error) => console.log(error));
}

function PostDetail(){

    const [postDetailResponse, setPostDetailResponse] = React.useState();
    getPostDetailResponse(setPostDetailResponse);

    if(postDetailResponse){
 
        const post = postDetailResponse.post;
        const comments = postDetailResponse.comments;

        return(

            <div id="details">

                <div id="post-detail-container">

                    <div id="post-detail">

                        <div className="post-title">
                            <a href={"/dashboard" + post[0].url}>{post[0].title}</a>

                        </div>

                        <div className="post-body">{post[0].body}</div>

                    </div>

                    <div className="post-detail-footer">

                        <div className="post-detail-tools">

                            <div className="item-edit">
                                <a href="">Edit</a>
                            </div>

                            <div className="item-delete">
                                <a href="">Delete</a>
                            </div>

                        </div>

                        <div className="post-timestamp">{post[0].timestamp}</div>

                    </div>

                </div>

                <Comments comments={comments} />

                <br></br>
                <br></br>
                <br></br>
                <br></br>
            
                <CommentCreator post={post} />

            </div>
        );
    }
}

export default PostDetail;