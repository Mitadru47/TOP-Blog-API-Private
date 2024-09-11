import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Login from "./LogIn";
import PostCreator from "./PostCreator";

import { isLoggedIn } from "../utils/auth";
import axios from "../utils/axios";

async function getPost(setPost){

    let { id } = useParams();

    axios.get("dashboard/post/" + id)
    
        .then((response) => setPost(response.data))
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