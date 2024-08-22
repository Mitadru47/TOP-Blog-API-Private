import React from "react";

function CommentCreator({ post, onSubmit }){

    return(
        
        <div id="comment-creator">

            <div id="form-container">

                <form target="status" action={"http://localhost:3000/dashboard/post/" + post[0]._id + "/comment/create"} method="POST">
                    
                    <textarea id="body-input" name="body" cols="150" rows="4" placeholder="Comment"></textarea>
                    
                    <br></br>
                
                    <input type="text" name="username" value={post[0].author.username} readOnly></input>
                    <input id="email-input" type="text" name="email" value={post[0].author.email} readOnly></input>
                    <input id="post-input" type="text" name="post"  value={post[0]._id} readOnly></input>
                
                    <button id="submit-button" type="submit">Comment</button>
                
                </form>

                <br></br>
                    
                <iframe id="status" name="status"></iframe>

            </div>
        </div>
    );
}

export default CommentCreator;