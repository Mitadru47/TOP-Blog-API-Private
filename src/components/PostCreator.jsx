import React from "react";
import { useState, useEffect } from "react";

async function getUser(setUserResponse){

    fetch("http://localhost:3000/dashboard/user", { mode: "cors" })
        
        .then((response) => response.json())
        .then((responseBody) => setUserResponse(responseBody))

        .catch((error) => { console.log(error); })
}

function PostCreator(props){

    const [userResponse, setUserResponse] = useState();
    useEffect(() => { getUser(setUserResponse); }, []);

    if(userResponse){

        return(

            <div id="post-creator">

                <div id="form-container">

                    <form action="http://localhost:3000/dashboard/post/create" method="POST">

                        <input type="text" name="title" id="title" placeholder="title" defaultValue={props.postDetailResponse.post[0].title}/>
                        <br></br>

                        <textarea rows="15" cols="150" type="text" name="body" id="body" placeholder="body" defaultValue={props.postDetailResponse.post[0].body}/>
                        <br></br>

                        <input type="text" name="timestamp" id="timestamp" value={new Date()} readOnly/>
                        <input type="text" name="author" id="author" value={userResponse[0].id} readOnly/>

                        <br></br>
                        <br></br>
     
                        <input type="text" name="id" id="id" defaultValue={props.postDetailResponse.post[0].id} hidden/>

                        {props.postDetailResponse.post[0].id ? 
                        <button type="submit" id="submit-button">Update Post</button> : <button type="submit" id="submit-button">Create Post</button>}

                    </form>

                </div>
                
            </div>
        );
    }
}

export default PostCreator;