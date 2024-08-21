import React from "react";
import { useParams } from "react-router-dom";

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
 
        return(

            <div>
                
                <div>{postDetailResponse.post[0].title}</div>

            </div>
        );
    }
}

export default PostDetail;