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
    //Problem with loading Dummy API data
    //implemented model for posts from https://dumyapi.io/data/v1/post (postPreview) 
    //PostPreview vs state.posts:
    //id=id, image=title, publishDate=postDate, owner=creatorUser, tags=postTags, text=content, likes=none
    state = {
        posts: [
            {id: 1, title: "FirstStory", postDate: "21.11.2021.", creatorUser: "John Doe", postTags: "dogs, human, beach", content:"Once upon a time, there was a beautiful princess who lived in a big castle, her name was Kate. She had a teddy bear named Billy. He was magic! One night, an evil witch went into the castle and took the princess' crown!", comments:["prvi komentar", "zadnji komentar"]},
            {id: 2, title: "Тропске шуме", postDate: "01.06.2020.", creatorUser: "Adam Smith", postTags: "pet, cat", content:"Тропске кишне шуме настале су на свим континентима које пресеца екватор. Протежу се са обе стране екватора до око 10° географске ширине, пре свега у Јужној Америци и Океанији, али и изван тих подручја. Највећа повезана површина - која истовремено чини више од половине укупне површине свих тропских кишних шума - налази се у подручју амазонског басена. Друге велике повезане тропске кишне шуме постоје у Заиру и Индонезији.", comments:[]},
            {id: 3, title: "NewYear", postDate: "02.01.2020.", creatorUser: "Andrea Tyler", postTags: "santa, snow", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mollis venenatis arcu, in rhoncus erat. Sed sed lorem vulputate, consectetur lacus vitae, gravida metus. Vivamus aliquet auctor finibus. Nunc sit amet tortor sit amet neque ultricies auctor eu id metus. Suspendisse pretium sapien a leo malesuada condimentum. Vivamus at justo elit. Cras euismod eros a erat malesuada condimentum. Sed a ante ante. Curabitur eget malesuada mi, ac maximus magna. Quisque elementum mi sed massa mattis hendrerit.", comments:["long long text..."]}, 
            {id: 4, title: "TheLastPost", postDate: "01.01.2019.", creatorUser: "Donald DeVito", postTags: "human, cat", content:"ho, ho, ho, very funny post, very funny", comments:["no comment", "no commentx2", "finally no comment"]}
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