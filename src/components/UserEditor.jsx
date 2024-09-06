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

function UserEditor(props){

    if(isLoggedIn()){

        const [userResponse, setUserResponse] = useState();
        useEffect(() => { getUser(setUserResponse); }, []);

        if(userResponse){

            return(

                <div>

                    <Header />

                    <div id="user-editor">

                        <div id="form-container">

                            <form action="http://localhost:3000/dashboard/user/edit" method="POST">

                                <input type="text" name="firstName" id="firstname" defaultValue={userResponse[0].firstName}/>
                                <input type="text" name="lastName" id="lastname" defaultValue={userResponse[0].lastName}/>

                                <input type="text" name="email" id="email" defaultValue={userResponse[0].email}/>
                            
                                <br></br>

                                <input type="text" name="username" id="username" defaultValue={userResponse[0].username}/>
                                <input type="text" name="password" id="password" defaultValue={userResponse[0].password}/>

                                <br></br>
                                <br></br>

                                <input type="text" name="id" id="id" defaultValue={userResponse[0].id} hidden/>
                                
                                <button type="submit" id="submit-button">Update User Details</button>
                                <a id="cancel-button" href={"/dashboard" + userResponse[0].url}>Cancel</a>

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