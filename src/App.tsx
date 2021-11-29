import React, {Component} from 'react';
import Header from "./components/Header/Header";//@ts-ignore
import {Route, BrowserRouter, Switch} from "react-router-dom";
import PostsTable from "./components/PostsTable/PostsTable";
import CreatePost from "./components/CreatePost/CreatePost";
import EditTable from "./components/EditTable/EditTable";
import EditPost from "./components/EditPost/EditPost";
import ModalDialog from "./components/Modal";
import data from "./dataBase";
import Data from "./models/Data"

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

    addNewPostToState = (post:Data[]) => {
        this.setState({
            posts: [...this.state.posts, post]
        })
    }

    deletePost = (id:string) => {
        const postsCopy = [...this.state.posts];//@ts-ignore
        const newCopyPosts = postsCopy.filter(post => post.id !== id);
        this.setState({posts: newCopyPosts});

    }

    editPost = (p:Data) => {
        const copyPosts = [...this.state.posts];//@ts-ignore
        let postPossition = copyPosts.map(post => post.id).indexOf(p.id)//@ts-ignore
        copyPosts[postPossition] = p;
        this.setState({posts: copyPosts})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleShow = async (post:Data) => {
        await this.setState({activePost: post})
        this.setState({show: true})
    }

    addNewComment = (comment:string, p:Data) => {
        let newCommentToPost:Data=p
        newCommentToPost.comments.push(comment);
        const copyPosts=[...this.state.posts];
        let postWithNewComment=copyPosts.map((post:Data) => post.id).indexOf(newCommentToPost.id)//@ts-ignore
        copyPosts[postWithNewComment]=newCommentToPost;
        this.setState({posts: copyPosts})
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Route path = "/" exact>
                    <PostsTable posts={this.state.posts} handleShow={this.handleShow}/>
                    <ModalDialog //@ts-ignore 
                        post={this.state.activePost} 
                        show={this.state.show} 
                        handleClose={this.handleClose} 
                        addNewComment={this.addNewComment}/>
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