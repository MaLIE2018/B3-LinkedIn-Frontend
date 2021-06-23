import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { CaretDownOutline, GlobeOutline, ImageOutline } from "react-ionicons";
import { useSelector, useDispatch } from "react-redux";

const api = process.env.REACT_APP_BE_URL;

function PostsModal(props) {
  const [postImageFormData, setImageFormData] = useState(undefined);

  const inputRef = useRef();
  const showModal = useSelector((state) => state.showModal);
  const post = useSelector((state) => state.addPost);
  const dispatch = useDispatch();

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    let form_data = new FormData();
    form_data.append("postImage", file);
    setImageFormData(form_data);
  };

  const createPost = async (e) => {
    e.preventDefault();
    if (post.text.length >= 10) {
      try {
        let response = await fetch(api + "/api/post/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        });
        if (response.ok) {
          if (postImageFormData !== undefined) {
            const data = await response.json();
            let newRes = await fetch(
              api + "/api/post/" + data.id + "/uploadPostImage",
              {
                method: "POST",
                body: postImageFormData,
              }
            );
            if (newRes.ok) {
              console.log("FileUploaded");
            }
          }
        } else {
          console.log("Something went wrong!");
        }
        setImageFormData(undefined);
        dispatch({ type: "ADD_NEW_POST", payload: { text: "" } });
        dispatch({ type: "SHOW_POST_MODAL" });
        dispatch({ type: "UPDATE_POSTS" });
      } catch (error) {
        console.log(`Something went wrong! ${error}`);
      }
    }
  };

  const handleUpdatePost = async (e, method, id) => {
    e.preventDefault();
    try {
      let response = await fetch(api + "/api/post/" + id, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: post.text, profileId: post.profileId }),
      });
      if (response.ok) {
        console.log("Post successfully updated");
        if (postImageFormData !== undefined && method !== "DELETE") {
          const data = await response.json();
          console.log("data:", data);
          let newRes = await fetch(
            api + "/api/post/" + data[0].id + "/uploadPostImage",
            {
              method: "POST",
              body: postImageFormData,
            }
          );
          if (newRes.ok) {
            console.log("FileUploaded");
          }
        }
      } else {
        console.log("Something went wrong!");
      }
      setImageFormData(undefined);
      dispatch({ type: "ADD_NEW_POST", payload: { text: "" } });
      dispatch({ type: "SHOW_POST_MODAL" });
      dispatch({ type: "UPDATE_POSTS" });
    } catch (error) {
      console.log(`Something went wrong! ${error}`);
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          dispatch({
            type: "ADD_NEW_POST",
            payload: { text: "" },
          });
          dispatch({ type: "SHOW_POST_MODAL" });
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Create a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='d-flex flex-nowrap mx-1'>
            <Col md={1} className='pl-0'>
              <img
                src={props.profile.image}
                alt=''
                className={"rounded-circle"}
                style={{ height: "50px" }}
              />
            </Col>
            <Col md={11} className='ml-2'>
              <div>
                <span className='font-weight-bolder'>{props.profile.name}</span>
                <Button
                  style={{ borderRadius: "50px", marginRight: "10px" }}
                  variant='outline-dark'
                  className='rounded-pill d-block p-1'>
                  <GlobeOutline
                    color={"#c0c0c0"}
                    title={"globe"}
                    height='15px'
                    width='15px'
                  />{" "}
                  Anyone{" "}
                  <CaretDownOutline
                    color={"#c0c0c0"}
                    title={"caret"}
                    height='15px'
                    width='15px'
                  />
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId='postText' className='mt-2'>
                <Form.Label className='sr-only'>Post text</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  className=''
                  placeholder='What do you want to talk about?'
                  style={{ border: "0" }}
                  value={post.text}
                  onChange={(e) =>
                    dispatch({
                      type: "ADD_NEW_POST",
                      payload: {
                        ...post,
                        profileId: props.profile.id,
                        text: e.target.value,
                      },
                    })
                  }
                  ref={inputRef}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant='link'>
                <ImageOutline
                  color={"#400040"}
                  title={"image"}
                  height='15px'
                  width='15px'
                />
                <input
                  type='file'
                  id='myfile'
                  name='myfile'
                  accept='image/jpeg, image/png'
                  onChange={handleFileUpload}></input>
              </Button>

              {!post?.id ? (
                <Button
                  variant={post.text?.length >= 10 ? "primary" : "light"}
                  className='rounded-pill float-right'
                  onClick={(e) => createPost(e)}>
                  Post
                </Button>
              ) : (
                <>
                  <Button
                    variant={"primary"}
                    className='rounded-pill float-right'
                    onClick={(e) => handleUpdatePost(e, "DELETE", post.id)}>
                    Delete
                  </Button>
                  <Button
                    variant={"primary"}
                    className='rounded-pill float-right'
                    onClick={(e) => handleUpdatePost(e, "PUT", post.id)}>
                    Edit
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer
          className='d-flex justify-content-between'
          style={{ backgroundColor: "#F3F2EF" }}>
          <Row>
            <Col md={6} className='w-50'>
              <Button
                variant={"light"}
                className='rounded-pill mt-1 d-block w-100'>
                Celebrate an occasion
              </Button>
              <Button
                variant={"light"}
                className='rounded-pill mt-1 d-block w-100'>
                Create a poll
              </Button>
              <Button
                variant={"light"}
                className='rounded-pill mt-1 d-block w-100'>
                Offer help
              </Button>
            </Col>
            <Col md={6} className=''>
              <Button
                variant={"light"}
                className='rounded-pill mt-1 d-block text-nowrap w-100'>
                Share that you’re hiring
              </Button>
              <Button
                variant={"light"}
                className='rounded-pill mt-1 d-block w-100'>
                Find an expert
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostsModal;
