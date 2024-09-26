import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Login from "./LogIn";
import PostCreator from "./PostCreator";

import { isLoggedIn } from "../utils/auth";
import axios from "../utils/axios";

let apiCallCount = 0;

async function getPost(setPost, id){

    console.log("PostEditor - API Trigger #" + apiCallCount++);

    axios.get("dashboard/post/" + id)
    
        .then((response) => setPost(response.data))
        .catch((error) => { console.log(error); });
}

function PostEditor() {

    if(isLoggedIn()){

        let { id } = useParams();
        const [postDetailResponse, setPostDetailResponse] = useState();

        useEffect(() => { getPost(setPostDetailResponse, id); }, []);

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