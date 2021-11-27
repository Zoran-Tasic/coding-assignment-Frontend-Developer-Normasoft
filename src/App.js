import React, {Component} from 'react';
import Header from "./components/Header/Header";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import PostsTable from "./components/PostsTable/PostsTable";
import CreatePost from "./components/CreatePost/CreatePost";
import EditTable from "./components/EditTable/EditTable";
import EditPost from "./components/EditPost/EditPost";
import ModalDialog from "./components/Modal"

class App extends Component {
    //to do implement redux-state managment
    //Dummy API models:
    //PostPreview vs state.posts:
    //id=id, image=title, publishDate=postDate, owner=creatorUser, tags=postTags, text=content, likes=none
    state = {
        posts: [
            {id: 1, title: "FirstPost", postDate: "21.11.2021.", creatorUser: "John Doe", postTags: "dogs, human, beach", content:"LoremIpsumDolores"},
            {id: 2, title: "AnotherPost", postDate: "01.06.2020.", creatorUser: "Adam Smith", postTags: "pet, cat", content:"Once upon a time lived a princess"},
            {id: 3, title: "NewYear", postDate: "27.11.2021.", creatorUser: "Andrea Tyler", postTags: "santa, snow", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mollis venenatis arcu, in rhoncus erat. Sed sed lorem vulputate, consectetur lacus vitae, gravida metus. Vivamus aliquet auctor finibus. Nunc sit amet tortor sit amet neque ultricies auctor eu id metus. Suspendisse pretium sapien a leo malesuada condimentum. Vivamus at justo elit. Cras euismod eros a erat malesuada condimentum. Sed a ante ante. Curabitur eget malesuada mi, ac maximus magna. Quisque elementum mi sed massa mattis hendrerit."},
            {id: 4, title: "TheLastPost", postDate: "01.01.2019.", creatorUser: "Donald DeVito", postTags: "human, cat", content:"ha, ha, ha, very funny post, very funny"}
        ],
        show: false,
        activePost: {}
    }

    componentDidMount() { //API problem
        fetch("https://dummyapi.io/data/v1/post?api-id=61a11bfd155aa00933fc3f6e")
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            console.log(data)
        })
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

    handleShow = (post) => {
        this.setState({show: true})
        this.setState({activePost: post})
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Route path = "/" exact>
                    <PostsTable posts={this.state.posts} handleShow={this.handleShow}/>
                        <ModalDialog post={this.state.activePost} show={this.state.show} handleClose={this.handleClose}/>
                </Route>
                <Route path = "/create">
                    <CreatePost addNewPostToState={this.addNewPostToState}/> 
                </Route>
                <Switch>
                    <Route path = "/edit/:id">
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