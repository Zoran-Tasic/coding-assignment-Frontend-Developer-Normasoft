import React from 'react';
import {Link} from 'react-router-dom';

const Post = ({post, edit, deletePost, handleShow}) => {
    const actionButtons = edit ? ( 
        <>
            <td> 
                <button onClick = {() => {deletePost(post.id)}} className="btn btn-danger">Delete</button>
            </td>
            <td> 
                <Link to = {post.id + "/edit/"} className="btn btn-warning ml-2">Edit</Link> 
            </td> 
        </>
        ) : 
        <button className="btn btn-info float-right" onClick={()=>{handleShow(post)}}>details</button> ;
    return (
    <> 
        <div className="card mt-3">
            <div className="card-header">
                <h3>{post.title}</h3>
            </div>
            <div className="card-body">
                <div className="row ">
                    <div className="col-6">
                        {post.postDate}
                    </div>
                    <div className="col-6">
                        {post.creatorUser}
                    </div>
                </div>
                <div className="row ">
                    <p className="pl-4 pr-3">Tags: </p>{post.postTags}
                </div>
                <div className="row ">
                    <p>{post.content.substr(0,100)} ...</p>
                </div>
            </div> 
            <div className="card-footer">
                {actionButtons}
            </div>           
        </div>
    </>
    )
}

export default Post;