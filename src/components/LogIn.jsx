import React from "react";
import { setLocalStorage } from "../utils/auth";

import axios from "../utils/axios";
import { BLOG_API_PUBLIC_INDEX, BLOG_API_PRIVATE_DASHBOARD } from "../utils/urls";

function handleSubmit(event){

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const plainFormData = Object.fromEntries(data.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

    axios.post("dashboard/login", formDataJsonString)

        .then((response) => {
        
            if(!response.data.message){

                let message = document.getElementById("login-failed-info");

                message.classList.remove("display-on");
                message.classList.add("display-off");

                setLocalStorage(response.data);
                window.location.href = BLOG_API_PRIVATE_DASHBOARD;
            }

            else{

                let message = document.getElementById("login-failed-info");

                message.classList.remove("display-off");
                message.classList.add("display-on"); 
            }
        })

        .catch((error) => {
            
            console.log(error);
        
            let message = document.getElementById("login-failed-info");

            message.classList.remove("display-off");
            message.classList.add("display-on"); 
        });
}

function passwordVisibiltyToggle(){

    var password = document.getElementById("login-password");
  
    if (password.type === "password"){
    
        password.type = "text";
        password.placeholder = "Password - Unmasked"
    }

    else {

        password.type = "password";
        password.placeholder = "Password - Masked"
    }
}

function Login(){

    return(
        
        <div id="login-container">
            
            <div id="login-container-secondary">

                <div id="header-container">
                    <a id="login-header" href="/">Blog API</a>
                </div>

                <div id="login-form-container">

                    <form onSubmit={handleSubmit}>

                        <div id="login-info">Author Mode - Sign In Required*</div>

                        <input type="text" name="username" id="login-username" placeholder="Username"/>
                        <input type="password" name="password" id="login-password" placeholder="Password - Masked"/>
                        
                        <button type="submit" id="submit-button">Log in</button>

                        <br></br>

                        <div id="login-form-container-footer">
                       
                            <div id="password-checkbox-container">

                                <input type="checkbox" id="password-checkbox" onClick={passwordVisibiltyToggle}/>
                                <span id="password-checkbox-info">show password</span>

                            </div>

                            <div id="login-failed-info" className="display-off">Log in failed, Please try again!</div> 
                            
                        </div>

                    </form>

                    <div id="public-url-container"> Don't have author credentials?
                        <a id="public-url" href={BLOG_API_PUBLIC_INDEX}> Go to Blog API - Public</a>
                    </div>

                </div>

            </div>
            
        </div>
    );
}

export default Login;