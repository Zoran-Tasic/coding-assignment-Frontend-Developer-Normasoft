import React from 'react';
import Post from '../Post/Post';

const EditTable = ({posts, deletePost}) => {
    const allPosts = posts.map(post => { 
        return (
            <div className="col-sm-6">
                <Post post={post} edit={true} deletePost={deletePost} key={post.id}/>
            </div>    
        )}
    )
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-10 offset-1">
                    <h3 className="display-4 m-4">Edit / Delete</h3>  
                    <div className="row">
                        <div className="col-10 offset-1">
                            <div class="row">
                                {allPosts}
                            </div>
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div>
    )
}

export default EditTable;