import React from "react";

function CommentCreator({ post, comment }){

    return(
        
        <div id="comment-creator">

            <div id="form-container">

                <form target="status" action={"http://localhost:3000/dashboard/post/" + post._id + "/comment/create"} method="POST">
                    
                    <textarea id="body-input" name="body" cols="150" rows="4" placeholder="Comment" defaultValue={comment.body}></textarea>
                    
                    <br></br>
                
                    {
                        (comment.username) ? 
                            <input type="text" name="username" value={comment.username} readOnly></input> 
                            : <input type="text" name="username" value={post.author.username} readOnly></input>
                    }

                    {
                        (comment.email) ? 
                            <input id="email-input" type="text" name="email" value={comment.email} readOnly></input>
                            : <input id="email-input" type="text" name="email" value={post.author.email} readOnly></input>
                    }

                    {
                        (comment._id) &&
                            <input id="comment-input" type="text" name="post"  value={comment._id} hidden></input>  
                    }

                    <input id="post-input" type="text" name="post"  value={post._id} readOnly></input>


                    {
                        (comment._id) ? 
                            <button id="submit-button" type="submit">Edit Comment</button> 
                            : <button id="submit-button" type="submit">Comment</button>
                    }

                    {
                        (comment._id) ?
                            <a id="cancel-button" href={"/dashboard" + comment.url}>Cancel</a> 
                            : <a id="cancel-button" href={"/dashboard"}>Cancel</a>
                    }
                    
                </form>

                <br></br>
                    
                <iframe id="status" name="status"></iframe>

            </div>
        </div>
    );
}

export default CommentCreator;