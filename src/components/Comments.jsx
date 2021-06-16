import React, { useState, useEffect } from 'react';
import { Form, FormControl, useAccordionToggle } from 'react-bootstrap';


const ApiURL = process.env.REACT_APP_BE_URL
const userId = localStorage.getItem("userId")

const Comments = (props) => {
    const [comments, setComments] = useState([])
    const [update, setUpdate] = useState(false)
    const [commentText, setCommentText] = useState("")

    const fetchComments = async () => {
        try {
            const res = await fetch(`${ApiURL}/comments/${props.postId}/post`)
            const data = await res.json()

            setComments(data)
            setUpdate(false)


        } catch (error) {
            console.log(error)
        }
    }
    //potst setupate true
    const postComment = async () => {
        try {
            console.log("hello")
            const res = await fetch(`${ApiURL}/comments/`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    comment: commentText,
                    profileId: userId,
                    postId: 12
                })
            })
            const data = await res.json()

            setUpdate(true)
        } catch (error) {
            console.log(error)
        }
    }
    const updateComment = async (e) => {
        try {

            const comment = e.target.closest(".comment")
            comment.outerHTML = `
            <input><input type="text">
            `
            const id = e.target.closes(".comment").id

            const res = await fetch(`${ApiURL}/comments/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: {
                    comment: commentText,
                    profileId: userId,
                    postId: 12
                }
            })

            setUpdate(true)


        } catch (error) {
            console.log(error)
        }
    }
    const deleteComment = async (e) => {
        try {
            const id = e.target.closest(".comment-wrapper").id
            const res = await fetch(`${ApiURL}/comments/${id}`, {
                method: "DELETE"
            })

            setUpdate(true)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    useEffect(() => {
        fetchComments()
    }, [update])


    if (comments.length) {
        return (
            <div>
                <div className="d-flex pb-3 align-items-center">
                    <img alt="" className="mr-3" style={{ borderRadius: "50%", width: "48px", height: "48px" }} src={"https://via.placeholder.com/200x200?text=Profile+picture"}></img>
                    <Form className="flex-grow-1" inline>
                        <FormControl onEnter={(e) => { return e.preventDefault() }} onChange={(e) => setCommentText(e.target.value)} style={{ width: "100%", height: "48px", borderRadius: "35px" }} type="text" placeholder="Add a comment..." className="flex-grow-1 mr-sm-2" />
                    </Form>
                    <button onClick={postComment}>Post</button>

                </div>
                {comments.map(comment =>

                    <div key={comment.id} id={comment.id} className="comment-wrapper pb-2 d-flex">
                        <img className="mr-3" height="48px" style={{ borderRadius: "35px" }} src="https://via.placeholder.com/200x200?text=Profile+picture"></img>
                        <div className="d-flex flex-column w-100">
                            <div>
                                <h6>{comment.profile.name}</h6>
                                <span>{comment.profile.title}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span className="comment">{comment.comment}</span>
                                <div>
                                    <button className="mr-2" onClick={(e) => deleteComment(e.target.closest(".comment-wrapper").id)}>Delete</button>
                                    <button onClick={(e) => updateComment(e)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        );

    } else {
        return "Loading"
    }
}

export default Comments;

