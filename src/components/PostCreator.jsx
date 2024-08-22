import React from "react";
import { useState, useEffect } from "react";

async function getUser(setUserResponse){

    fetch("http://localhost:3000/dashboard/user", { mode: "cors" })
        
        .then((response) => response.json())
        .then((responseBody) => setUserResponse(responseBody))

        .catach((error) => { console.log(error); })
}

function PostCreator(){

    const [userResponse, setUserResponse] = useState();
    useEffect(() => { getUser(setUserResponse); }, []);

    if(userResponse){

        return(

            <div id="post-creator">

                <div id="form-container">

                    <form target="status" action="http://localhost:3000/dashboard/post/create" method="POST">

                        <input type="text" name="title" id="title" placeholder="title"/>
                        <br></br>

                        <textarea rows="15" cols="150" type="text" name="body" id="body" placeholder="body"/>
                        <br></br>

                        <input type="text" name="timestamp" id="timestamp" value={new Date()} readOnly/>
                        <input type="text" name="author" id="author" value={userResponse[0].id} readOnly/>

                        <br></br>
                        <br></br>

                        
                        <button type="submit" id="submit-button">Create Post</button>

                    </form>

                </div>

                <iframe id="status" name="status"></iframe>
                
            </div>
        );
    }
}

export default PostCreator;