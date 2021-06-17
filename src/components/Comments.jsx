import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormControl,
  Modal,
  useAccordionToggle,
} from "react-bootstrap";
import Comment from "../components/Comment.jsx";

const ApiURL = process.env.REACT_APP_BE_URL;
const userId = localStorage.getItem("userId");

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(false);
  const [addCommentText, setAddCommentText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(`${ApiURL}/comments/${props.postId}/post`);
      const data = await res.json();

      setComments(
        data.sort((a, b) => {
          return a.createdAt > b.createdAt ? -1 : 1;
        })
      );
      setUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };
  //potst setupate true
  const postComment = async (e) => {
    try {
      if (addCommentText.length > 0) {
        const res = await fetch(`${ApiURL}/comments/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            comment: addCommentText,
            profileId: userId,
            postId: props.postId,
          }),
        });
        const data = await res.json();

        setUpdate(true);
        props.setUpdate(true);
        setAddCommentText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [update]);

  return (
    <div>
      <div className='d-flex pb-3 align-items-center'>
        <img
          alt=''
          className='mr-3'
          style={{ borderRadius: "50%", width: "48px", height: "48px" }}
          src={props.userImage}></img>
        <Form className='flex-grow-1' inline>
          <FormControl
            value={addCommentText}
            onChange={(e) => setAddCommentText(e.target.value)}
            style={{ width: "100%", height: "48px", borderRadius: "35px" }}
            type='text'
            placeholder='Add a comment...'
            className='flex-grow-1 mr-sm-2'
          />
        </Form>
        <button className='btn-success' onClick={postComment}>
          Post
        </button>
      </div>
      <>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              setUpdate={setUpdate}
              topSetUpdate={props.setUpdate}
              key={comment.id}
              comment={comment}
            />
          ))}
      </>
    </div>
  );
};

export default Comments;
