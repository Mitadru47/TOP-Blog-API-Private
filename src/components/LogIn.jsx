import React from "react";

function Login(){

    return(
        
        <div id="login-container">
            
            <div id="login-container-secondary">

                <div id="header-container">
                    <a id="login-header" href="/">Blog API</a>
                </div>

                <div id="login-form-container">

                    <form action="http://localhost:3000/dashboard/login" method="POST">

                        <div id="login-info">Author Mode - Sign In Required*</div>

                        <input type="text" name="username" id="login-username" placeholder="Username"/>
                        <input type="text" name="password" id="login-password" placeholder="Password"/>

                        <button type="submit" id="submit-button">Log in</button>

                    </form>

                    <div id="public-url-container"> Don't have author credentials?
                        <a id="public-url" href="http://localhost:5173/"> Go to Blog API - Public</a>
                    </div>

                </div>

            </div>
            
        </div>
    );
}

export default Login;