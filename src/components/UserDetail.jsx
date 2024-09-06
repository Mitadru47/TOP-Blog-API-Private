import React, { useState } from "react";

import Login from "./LogIn";
import Header from "./Header";

import { isLoggedIn } from "../utils/auth";

async function getUserDetail(setUserDetailResponse){

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem("token"));

    fetch("http://localhost:3000/dashboard/user", { mode: 'cors', headers: headers })
        .then((response) => response.json())
        .then((responseBody) => setUserDetailResponse(responseBody))

        .catch((error) => console.log(error));
}

function UserDetail(){
    
    if(isLoggedIn()){

        const [userDetailResponse, setUserDetailResponse] = useState();
        getUserDetail(setUserDetailResponse);

        if(userDetailResponse){
            
            return(

                <div>

                    <Header />

                    <div id="author-details">
                        
                        <div id="author-details-palette">

                            <div id="authorName"><strong>Author:</strong><br></br>{userDetailResponse[0].firstName + " " + userDetailResponse[0].lastName}</div>
                            
                            <div className="item-edit">
                                <a href={"/dashboard" + userDetailResponse[0].url + "/edit"}>Edit</a>
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
                    
                </div>
            );
        }

        else
            return <div className="loader">Loading Author...</div>;
    }

    else
        return <Login />;
}

export default UserDetail;