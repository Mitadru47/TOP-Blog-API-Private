import React, { useEffect, useState } from "react";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn, getExpirationTime, logout } from "../utils/auth";

import Loader from "./Loader.jsx";
import axios from "../utils/axios";

let apiCallCount = 0;

async function getUserDetail(setUserDetailResponse){

    console.log("UserDetail - API Trigger #" + apiCallCount++);

    axios.get("dashboard/user")

        .then((response) => setUserDetailResponse(response.data))
        .catch((error) => {
            
            console.log(error);
          
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Author...";
    
            let errorElements = document.getElementsByClassName("error");
            errorElements[0].innerText = error;
        });
}

function handleLogout(){
    logout();
}

function UserDetail(){
    
    if(isLoggedIn()){

        const [userDetailResponse, setUserDetailResponse] = useState();
        
        useEffect(() => { 
    
            const intervalID = setInterval(() => {
              getUserDetail(setUserDetailResponse); 
        
            }, 5000);
            
            // Clean-Up Function
            return (() => { clearInterval(intervalID); });
        });
        
        if(userDetailResponse){
            
            return(

                <div>

                    <Header />

                    <div id="author-details">
                        
                        <div id="author-details-palette">

                            <div id="authorName"><strong>Author:</strong><br></br>{userDetailResponse[0].firstName + " " + userDetailResponse[0].lastName}</div>
                            
                            <div className="user-detail-options">
                           
                                <div className="item-edit">
                                    <a href={"/dashboard" + userDetailResponse[0].url + "/edit"}>Edit</a>
                                </div>

                                <div className="log-out">
                                    <a href={"/dashboard"} onClick={handleLogout}>Log out</a>
                                </div>

                            </div>

                        </div>

                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                        <div><strong>Alias:</strong> {userDetailResponse[0].username}</div>
                        <div><strong>Email:</strong> {userDetailResponse[0].email}</div>

                    </div>

                    <div className="log-out-expiration-info">**Authorization token expires {  getExpirationTime() }</div>
                    
                </div>
            );
        }

        else
            return <Loader name="Author"/>;
    }

    else
        return <Login />;
}

export default UserDetail;