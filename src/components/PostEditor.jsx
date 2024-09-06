import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Login from "./LogIn";
import PostCreator from "./PostCreator";

import { isLoggedIn } from "../utils/auth";

async function getPost(setPost){

    let { id } = useParams();

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem("token"));

    fetch("http://localhost:3000/dashboard/post/" + id, { mode: "cors", headers: headers })

        .then((response) => response.json())
        .then((responseBody) => setPost(responseBody))

        .catch((error) => { console.log(error); });
}

function PostEditor() {

    if(isLoggedIn()){

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

    else
        return <Login />;
}

export default PostEditor