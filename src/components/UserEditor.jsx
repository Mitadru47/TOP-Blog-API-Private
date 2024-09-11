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

        fetch("http://localhost:3000/dashboard/user/edit", { 
            
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

                    window.location.href = "http://localhost:5174/dashboard/user";
                }

                else{

                    let message = document.getElementById("post-failed-info");
    
                    message.classList.remove("display-off");
                    message.classList.add("display-on"); 
                }
            })

            .catch((error) => {
            
                console.log(error);
            
                let message = document.getElementById("post-failed-info");
    
                message.classList.remove("display-off");
                message.classList.add("display-on"); 
            });
    }

    else
        window.location.href = "http://localhost:5174/dashboard";
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

                                <input type="text" name="firstName" id="firstname" defaultValue={userResponse[0].firstName}/>
                                <input type="text" name="lastName" id="lastname" defaultValue={userResponse[0].lastName}/>

                                <input type="text" name="email" id="email" defaultValue={userResponse[0].email}/>
                            
                                <br></br>

                                <input type="text" name="username" id="username" defaultValue={userResponse[0].username}/>
                                <input type="password" name="password" id="password" placeholder="Password - Masked" required/>

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

                                    <div id="post-failed-info" className="display-off">Something went wrong. Please try again!</div>
                            
                                </div>

                            </form>

                        </div>
                        
                    </div>
                    
                </div>
            );
        }

        else
            return <div className="loader">Loading User Editor...</div>;
    }

    else
        return <Login />;
}

export default UserEditor;