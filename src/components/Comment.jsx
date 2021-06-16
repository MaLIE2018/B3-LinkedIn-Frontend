import React, { useState, useEffect } from 'react';
import { FormControl, Modal, Form, Button } from 'react-bootstrap';
import dateDiff from '../helper/datediff';

const ApiURL = process.env.REACT_APP_BE_URL
const userId = localStorage.getItem("userId")

const Comment = (props) => {

    const [update, setUpdate] = useState(false)
    const [show, setShow] = useState(false);
    const [commentText, setCommentText] = useState(props.comment.comment);
    const [commentLikes, setCommentLikes] = useState(0);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const updateComment = async (e) => {
        try {
            const res = await fetch(`${ApiURL}/comments/${props.comment.id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    comment: commentText,
                    profileId: userId,
                    postId: 12
                })
            })

            props.setUpdate(true)
            handleClose()

        } catch (error) {
            console.log(error)
        }
    }

    const deleteComment = async (e) => {
        try {

            const res = await fetch(`${ApiURL}/comments/${props.comment.id}`, {
                method: "DELETE"
            })

            props.setUpdate(true)

        } catch (error) {
            console.log(error)
        }
    }

    const fetchCommentLikes = async () => {
        console.log("like")
        try {
            const res = await fetch(`${ApiURL}/like/comment/${props.comment.id}`)
            const likes = await res.json()
            setCommentLikes(likes.likes)
            setUpdate(false)
        } catch (error) {
            console.log(error)
        }
    }

    const likeComment = async () => {
        try {
            const res = await fetch(`${ApiURL}/like/comment/${props.comment.id}`,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                profileId: userId
            })
            })
            setUpdate(true)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchCommentLikes()
    }, [update])

    return (
        <>
            <div className="comment-wrapper pb-4 d-flex">
                <img className="mr-3" height="48px" style={{ borderRadius: "35px" }} src="https://via.placeholder.com/200x200?text=Profile+picture"></img>
                <div className="d-flex flex-column w-100">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">

                            <strong>{props.comment.profile.name}</strong>
                            <small>{props.comment.profile.title}</small>
                        </div>

                        <span>Likes: {commentLikes}</span>
                        <small>Posted {dateDiff(props.comment.createdAt, new Date())}</small>
                        <svg onClick={likeComment} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                            <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
                        </svg>

                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="comment">{props.comment.comment}</span>
                        <div>
                            <button className="btn-danger mr-2" onClick={(e) => deleteComment(e)}>Delete</button>
                            <button className="btn-info" onClick={() => handleShow()}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit comment</Modal.Title>
                </Modal.Header>
                <Modal.Body> <Form className="flex-grow-1" inline>
                    <FormControl value={commentText} onChange={(e) => setCommentText(e.target.value)} style={{ width: "100%", height: "48px", borderRadius: "35px" }} type="text" placeholder="Update your comment..." className="flex-grow-1 mr-sm-2" />
                </Form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateComment}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Comment;
