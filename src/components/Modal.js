import React, {Component}  from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class ModalDialog extends Component {
    
    state = {
        newComment: "" 
    }

    changePost = (event) => {
        this.setState({newComment: event.target.value});
    }

    addComment = () => {
        this.props.addNewComment(this.state.newComment, this.props.post);
        this.setState({newComment: ""})
    }

    render(){
        console.log(this.state.newComment)
        let allComments=''
        if(this.props.post.comments!=undefined){
            allComments=this.props.post.comments.map(comment => { 
                return (
                    <li>{comment}</li>
                )}
            )
        }
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header>
                    <Modal.Title>{this.props.post.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row ">
                        <div className="col-6">
                            {this.props.post.postDate}
                        </div>
                        <div className="col-6">
                            {this.props.post.creatorUser}
                        </div>
                    </div>
                    <div className="row ">
                        <p className="pl-4 pr-3">Tags: </p>{this.props.post.postTags}
                    </div>
                    <div className="row ">
                        <p className="pl-3 pr-3 text-justify">{this.props.post.content}</p>
                    </div>
                    <div className="row ">
                        <p className="pl-3 pr-3">Comments:</p>
                        <ul className="pr-3 text-justify">{allComments}</ul>
                    </div>
                    <div>
                        <input type = "text" onChange={this.changePost} id="comment" value={this.state.newComment} placeholder="new comment" className="form-control"/> <br/>
                        <button onClick={this.addComment} className="btn btn-primary">Add comment</button>  
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalDialog;