import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Login from "./LogIn";
import PostCreator from "./PostCreator";

import { isLoggedIn } from "../utils/auth";

import Loader from "./Loader.jsx";
import axios from "../utils/axios";

let apiCallCount = 0;

async function getPost(setPost, id){

    console.log("PostEditor - API Trigger #" + apiCallCount++);

    axios.get("dashboard/post/" + id)
    
        .then((response) => setPost(response.data))
        .catch((error) => {
            
            console.log(error);
          
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Post Editor...";
    
            let errorElements = document.getElementsByClassName("error");
            errorElements[0].innerText = error;
        });
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
            return <Loader name="Post Editor"/>;
    }

    else
        return <Login />;
}

export default PostEditor