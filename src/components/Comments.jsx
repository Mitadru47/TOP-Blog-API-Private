import React from "react";

function Comment({ comment }){

    return(

        <div className="comment">
        
            <div className="comment-details">

                <div className="comment-username">
                    <a href={"/dashboard" + comment.url}>{comment.username}:</a>
            
                </div>
            
                <div className="comment-body">{comment.body}</div>

            </div>

            <div className="comment-tools">

                <div className="item-edit">
                    <a href="">Edit</a>
                </div>

                <div className="item-delete">
                    <a href="">Delete</a>
                </div>

            </div>

        </div>
    );
}

function Comments(props){

    if(props.comments.length > 0){

        let index = 0;
        return(

            <div className="comments-container">

                <h2>Comments</h2>
                {props.comments.map((comment) => <Comment key={index} index={index++} comment={comment} />)}
            
            </div>
        );
    }

    else{

        return(

            <div id="comments-container">

                <h2>Comments</h2>
                <div id="no-comments">No Comments</div>
            
            </div>
        );
    }
}

export default Comments;