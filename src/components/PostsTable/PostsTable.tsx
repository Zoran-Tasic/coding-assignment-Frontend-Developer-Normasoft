import React from "react";
import Post from "../Post/Post";
import Data from "../../models/Data";

//@ts-ignore
const PostsTable = ({posts, handleShow}) => {

    
    const allPosts=posts.map((post:Data) => {
            return ( 
                <div className="col-sm-6">
                    {/*//@ts-ignore*/}
                    <Post post={post} handleShow={handleShow} key={post.id}/>
                </div>
                
            )
        }
    )
    return ( 
    <div className="container-fluid">
        <div className="row">
            <div className="col-10 offset-1">
                <h3 className="display-4 m-4">All posts</h3> 
                <div className="row">
                    <div className="col-10 offset-1">
                        <div className="row">
                            {allPosts} 
                        </div>
                    </div> 
                </div> 
            </div> 
        </div> 
    </div>
    );
};

export default PostsTable;