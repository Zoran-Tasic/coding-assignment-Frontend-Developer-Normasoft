import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalDialog = ({post, show, handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{post.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    <p className="pl-3 pr-3 text-justify">{post.content}</p>
                </div>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDialog;