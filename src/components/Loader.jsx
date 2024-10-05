import React from "react";
import { BLOG_API_PRIVATE_LOGIN } from "../utils/urls";

function Loader(props){

    return(

        <div>

            <div id="top-nav">

                <div id="header-container">
                    <a id="header" href="/">Blog API</a>
                </div>
                
                <div id="header-info-container">
                
                    <div id="header-info">

                        <div id="tool-container">

                            <div id="create-post-container">
                                <a id="create-post" href="/dashboard/post/create">Create</a>
                            </div>

                        </div>

                        <div id="post-count-container"> 
                            <p id="post-count">Total Posts: ..</p>
                        </div>

                    </div>

                    <div id="author-container">
                        <a id="author" href={BLOG_API_PRIVATE_LOGIN}>...</a>
                    </div>

                </div>

            </div>

            {props.name && <div className="loader">Loading {props.name}...</div>}
            {props.name && <div className="error"></div>}

        </div>
    );
}

export default Loader;