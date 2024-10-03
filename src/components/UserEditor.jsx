import React from "react";
import { useState, useEffect } from "react";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

import Loader from "./Loader.jsx";
import axios from "../utils/axios";

import { BLOG_API_PRIVATE_DASHBOARD } from "../utils/urls";

let apiCallCount = 0;

async function getUser(setUserResponse){

    console.log("UserEditor - API Trigger #" + apiCallCount++);

    axios.get("dashboard/user")
    
        .then((response) => setUserResponse(response.data))
        .catch((error) => {
            
            console.log(error);
          
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Author Editor...";
    
            let errorElements = document.getElementsByClassName("error");
            errorElements[0].innerText = error;
        });
}

function handleSubmit(event){

    event.preventDefault();

    // Form Data Parsing

    const data = new FormData(event.currentTarget);

    const plainFormData = Object.fromEntries(data.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

    if(isLoggedIn()){

        axios.post("dashboard/user/edit", formDataJsonString)

            .then((response) => {
            
                if(response.data.status === "Success!"){
                
                    let message = document.getElementById("user-failed-info");

                    message.classList.remove("display-on");
                    message.classList.add("display-off");

                    window.location.href = BLOG_API_PRIVATE_DASHBOARD + "/user";
                }

                else{

                    let message = document.getElementById("user-failed-info");
    
                    message.classList.remove("display-off");
                    message.classList.add("display-on"); 
                }
            })

            .catch((error) => {
            
                console.log(error);
            
                let message = document.getElementById("user-failed-info");
    
                message.classList.remove("display-off");
                message.classList.add("display-on"); 

                // Displaying error messages received from backend

                let err = "";

                for(let i=0; i<error.response.data.error.length; i++){
                
                    if(i === error.response.data.error.length - 1)
                        err = err + error.response.data.error[i].msg;

                    else
                        err = err + error.response.data.error[i].msg + "\n ";
                }

                message.innerText = err;
            });
    }

    else
        window.location.href = BLOG_API_PRIVATE_DASHBOARD;
}

function passwordVisibiltyToggle(){

    var password = document.getElementById("password");
  
    if (password.type === "password"){
    
        password.type = "text";
        password.placeholder = "Password - Unmasked"
    }

    else {

        password.type = "password";
        password.placeholder = "Password - Masked"
    }
}

function UserEditor(){

    if(isLoggedIn()){

        const [userResponse, setUserResponse] = useState();
        useEffect(() => { getUser(setUserResponse); }, []);

        if(userResponse){

            return(

                <div>

                    <Header />

                    <div id="user-editor">

                        <div id="form-container">

                            <form onSubmit={handleSubmit}>

                                <input type="text" name="firstName" id="firstname" placeholder="Firstname" defaultValue={userResponse[0].firstName}/>
                                <input type="text" name="lastName" id="lastname" placeholder="Lastname" defaultValue={userResponse[0].lastName}/>

                                <input type="text" name="email" id="email" placeholder="Email" defaultValue={userResponse[0].email}/>
                            
                                <br></br>

                                <input type="text" name="username" id="username" placeholder="Username" defaultValue={userResponse[0].username}/>
                                <input type="password" name="password" id="password" placeholder="Password - Masked" autoComplete="on"/>

                                <br></br>
                                <br></br>

                                <input type="text" name="id" id="id" defaultValue={userResponse[0].id} hidden/>
                                
                                <button type="submit" id="submit-button">Update Author Details</button>
                                <a id="cancel-button" href={"/dashboard" + userResponse[0].url}>Cancel</a>

                                <div id="login-form-container-footer">
                       
                                    <div id="password-checkbox-container">

                                        <input type="checkbox" id="password-checkbox" onClick={passwordVisibiltyToggle}/>
                                        <span id="password-checkbox-info">show password</span>

                                    </div>

                                    <div id="user-failed-info" className="display-off">Something went wrong. Please try again!</div>
                            
                                </div>

                            </form>

                        </div>
                        
                    </div>
                    
                </div>
            );
        }

        else
            return <Loader name="Author Editor"/>;
    }

    else
        return <Login />;
}

export default UserEditor;