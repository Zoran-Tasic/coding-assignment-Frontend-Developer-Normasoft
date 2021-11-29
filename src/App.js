import React, {Component} from 'react';
import Header from "./components/Header/Header";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import PostsTable from "./components/PostsTable/PostsTable";
import CreatePost from "./components/CreatePost/CreatePost";
import EditTable from "./components/EditTable/EditTable";
import EditPost from "./components/EditPost/EditPost";
import ModalDialog from "./components/Modal";
import data from "./dataBase";

class App extends Component {
    //Problem with loading Dummy API data
    //implemented model for posts from https://dumyapi.io/data/v1/post (postPreview) 
    //PostPreview vs state.posts:
    //id=id, image=title, publishDate=postDate, owner=creatorUser, tags=postTags, text=content, likes=none
    state = {
        posts: [],
        show: false,
        activePost: {}
    }

    componentDidMount() {
        this.setState({posts:data})
        //API problem
        //fetch("https://dummyapi.io/data/v1/post?api-id=61a11bfd155aa00933fc3f6e")
        //.then(res=>{
        //    return res.json()
        //})
        //.then(data=>{
        //    console.log(data)
        //    this.setState({posts: data})
        //})
    }

    addNewPostToState = (post) => {
        this.setState({
            posts: [...this.state.posts, post]
        })
    }

    deletePost = (id) => {
        const postsCopy = [...this.state.posts];
        const newCopyPosts = postsCopy.filter(post => post.id !== id);
        this.setState({posts: newCopyPosts});

    }

    editPost = (p) => {
        const copyPosts = [...this.state.posts];
        let postPossition = copyPosts.map(post => post.id).indexOf(p.id)
        copyPosts[postPossition] = p;
        this.setState({posts: copyPosts})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleShow = async (post) => {
        await this.setState({activePost: post})
        this.setState({show: true})
    }

    addNewComment = (comment, p) => {
        let newCommentToPost=p
        newCommentToPost.comments.push(comment);
        const copyPosts=[...this.state.posts];
        let postWithNewComment=copyPosts.map(post => post.id).indexOf(newCommentToPost.id)
        copyPosts[postWithNewComment]=newCommentToPost;
        this.setState({posts: copyPosts})
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Route path = "/" exact>
                    <PostsTable posts={this.state.posts} handleShow={this.handleShow}/>
                    <ModalDialog post={this.state.activePost} show={this.state.show} handleClose={this.handleClose} addNewComment={this.addNewComment}/>
                </Route>
                <Route path = "/create">
                    <CreatePost addNewPostToState={this.addNewPostToState}/> 
                </Route>
                <Switch>
                    <Route path = "/:id/edit">
                        <EditPost posts={this.state.posts} editPost={this.editPost}/> 
                    </Route>
                    <Route path = "/edit">
                        <EditTable posts={this.state.posts} deletePost={this.deletePost}/> 
                    </Route>
                </Switch> 
            </BrowserRouter >
        )
    }
}

export default App;