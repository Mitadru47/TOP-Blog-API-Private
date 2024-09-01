import React from "react";
import { useParams } from "react-router-dom";

import Comments from "./Comments";
import CommentCreator  from "./CommentCreator";

import Header from "./Header";

async function getPostDetailResponse(setPostDetailResponse){

    let { id } = useParams();

    fetch("http://localhost:3000/dashboard/post/" + id, { mode: "cors" })

        .then((response) => response.json())
        .then((responseBody) => setPostDetailResponse(responseBody))

        .catch((error) => console.log(error));
}

function PostDetail({ headerless }){

    const [postDetailResponse, setPostDetailResponse] = React.useState();
    getPostDetailResponse(setPostDetailResponse);

    if(postDetailResponse){
 
        const post = postDetailResponse.post;
        const comments = postDetailResponse.comments;

        return(

            <div>

                { !headerless && <Header />}

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
                                    <a href={"/dashboard" + post[0].url + "/edit"}>Edit</a>
                                </div>

                                <div className="item-delete">
                                    <a href={"/dashboard" + post[0].url + "/delete"}>Delete</a>
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
                
                    <CommentCreator post={post[0]} comment={[{ _id: "", body: "", username: "", email: "" }]}/>

                </div>
                
            </div>
        );
    }

    else
        return <div className="loader">Loading Post...</div>;
}

export default PostDetail;