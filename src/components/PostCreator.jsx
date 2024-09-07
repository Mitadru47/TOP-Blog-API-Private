import React from "react";
import { useState, useEffect } from "react";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

async function getUser(setUserResponse){

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem("token"));

    fetch("http://localhost:3000/dashboard/user", { mode: "cors", headers: headers })
        
        .then((response) => response.json())
        .then((responseBody) => setUserResponse(responseBody))

        .catch((error) => { console.log(error); })
}

function handleSubmit(event){

    event.preventDefault();

    // Form Data Parsing

    const data = new FormData(event.currentTarget);

    const plainFormData = Object.fromEntries(data.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

    // API Header Creation

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem("token"));

    if(isLoggedIn()){

        fetch("http://localhost:3000/dashboard/post/create", { 
            
                mode: "cors", 
                method: "POST", 
                
                headers: headers,
                body: formDataJsonString 
            })

            .then((response) => response.json())
            .then((responseBody) => {
            
                if(responseBody.status === "Success!"){
                
                    let message = document.getElementById("post-failed-info");

                    message.classList.remove("display-on");
                    message.classList.add("display-off");

                    window.location.href = "http://localhost:5174/dashboard/post/" + responseBody.id;
                }

                else{

                    let message = document.getElementById("post-failed-info");
    
                    message.classList.remove("display-off");
                    message.classList.add("display-on"); 
                }
            })

            .catch((error) => console.log(error));
    }

    else
        window.location.href = "http://localhost:5174/dashboard";
}

function PostCreator(props){

    if(isLoggedIn()){

        const [userResponse, setUserResponse] = useState();
        useEffect(() => { getUser(setUserResponse); }, []);

        if(userResponse){

            return(

                <div>

                    <Header />

                    <div id="post-creator">

                        <div id="form-container">

                            <form onSubmit={handleSubmit}>

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

                                {props.postDetailResponse.post[0].id ? 
                                <a id="cancel-button" href={"/dashboard" + props.postDetailResponse.post[0].url}>Cancel</a> : <a id="cancel-button" href={"/dashboard"}>Cancel</a>}

                                <div id="post-failed-info" className="display-off">Something went wrong. Please try again!</div>

                            </form>

                        </div>
                        
                    </div>

                </div>
            );
        }

        else
            return <div className="loader">Loading Post Creator/Editor...</div>;
    }

    else
        return <Login />;
}

export default PostCreator;