import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostCreator from "./PostCreator";

async function getPost(setPost){

    let { id } = useParams();

    fetch("http://localhost:3000/dashboard/post/" + id, { mode: "cors" })

        .then((response) => response.json())
        .then((responseBody) => setPost(responseBody))

        .catch((error) => { console.log(error); });
}

function PostEditor() {

    const [postDetailResponse, setPostDetailResponse] = useState();
    getPost(setPostDetailResponse)

    if(postDetailResponse){
        
        return(
            <div>
                <PostCreator postDetailResponse={postDetailResponse}/>
            </div>
        );
    }

    else
        return <div className="loader">Loading Post Editor...</div>;
}

export default PostEditor