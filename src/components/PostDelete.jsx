import React from "react";
import PostDetail from "./PostDetail";

import { useLocation, useParams } from "react-router-dom";

async function getPostDetailResponse(setPostDetailResponse){

    let { id } = useParams();

    fetch("http://localhost:3000/dashboard/post/" + id, { mode: "cors" })

        .then((response) => response.json())
        .then((responseBody) => setPostDetailResponse(responseBody))

        .catch((error) => console.log(error));
}

function PostDelete(){

    const [postDetailResponse, setPostDetailResponse] = React.useState();
    getPostDetailResponse(setPostDetailResponse);

    if(postDetailResponse){

        return(

            <div id="delete-container">

                <div id="delete-dialog">
                
                    <div id="delete-message">Are you sure?</div>

                    <br></br>

                    <div id="delete-info-lines">

                        <div className="delete-info">All info pertaining to the following post will be permanently erased.</div>
                        <div className="delete-info">All comment(s) & info pertaining to the comment poster(s) associated with this post will also be permanently erased.</div>

                    </div>

                    <br></br>

                    <form action={"http://localhost:3000/dashboard" + postDetailResponse.post[0].url + "/delete"} method="POST">

                        <button id="delete-button" type="submit">Delete</button>
                        <a id="cancel-button" href={"/dashboard" + postDetailResponse.post[0].url}>Cancel</a>

                    </form>

                </div>

                <br></br>

                <PostDetail />

            </div>
        );
    }

    else
        return <div className="loader">Loading Post Delete Confirmation Dialog...</div>;
}

export default PostDelete;