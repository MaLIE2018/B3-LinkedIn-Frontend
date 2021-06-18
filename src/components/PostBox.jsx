import React, { useEffect, useState } from "react";
import { Col, ListGroup, Button } from "react-bootstrap";
import {
  ThumbsUpOutline,
  ChatbubblesOutline,
  ArrowRedoOutline,
  SendOutline,
  EllipsisHorizontalOutline,
} from "react-ionicons";
import { Link } from "react-router-dom";
import dateDiff from "../helper/datediff";
import Comments from "./Comments";
import MyLoader from "./ContentLoader";
import Box from "./parts/Box";
import comments from "../assets/img/comments.PNG";
import styled from "styled-components";
import axios from "axios";
const api = process.env.REACT_APP_BE_URL;

const Styles = styled.div`
  .btn {
    padding: 0;
    color: var(--main-text-color);
  }
`;

const PostBox = (props) => {
  const now = new Date();
  let userId = localStorage.getItem("userId");
  const [likes, setLikes] = useState(0);
  const [noOfComments, setNoOfComments] = useState(0);
  const [update, setUpdate] = useState(false);
  const [Likers, setLikers] = useState([]);

  const getLikesComments = async () => {
    try {
      const noOfComments = await axios.get(
        api + "api/comments/" + props.post.id + "/post/count"
      );
      const noOfLikes = await axios.get(api + "api/like/post/" + props.post.id);
      const names = await axios.get(
        api + `api/like/post/${props.post.id}/users`
      );
      setLikers(names.data.users);
      setNoOfComments(noOfComments.data.count);
      setLikes(noOfLikes.data.likes);
      setUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikesComments();
  }, [update]);

  useEffect(() => {
    userId = localStorage.getItem("userId");
  }, []);

  return (
    <Styles>
      <Box
        key={props.post.id}
        item={props.post}
        render={(state) => (
          <>
            <ListGroup>
              <ListGroup.Item style={{ paddingLeft: "0", paddingRight: "0" }}>
                <div className='d-flex flex-row'>
                  <Col className='pl-0'>
                    <a as={Link} href={`/profile/${props.post.profile?.id}`}>
                      {" "}
                      <span className='font-weight-bolder'>
                        {Likers.slice(0, 2)
                          .map((p) => {
                            return p.profile.name;
                          })
                          .join(", ")}
                      </span>
                    </a>
                    <span
                      className='font-weight-lighter'
                      style={{ fontSize: "0.8rem" }}>
                      {" "}
                      like this.
                    </span>
                    {userId == props.post.profileId && (
                      <EllipsisHorizontalOutline
                        color={"#808080"}
                        title={"thumb"}
                        height='25px'
                        width='25px'
                        className='float-right btn'
                        onClick={(e) =>
                          this.handleEditButtonClick(e, state.item)
                        }
                      />
                    )}
                  </Col>
                </div>
                <hr></hr>
              </ListGroup.Item>
              <ListGroup.Item style={{ paddingLeft: "0", paddingBottom: "0" }}>
                <div className='d-flex flex-row'>
                  <Col md={1} className='pl-0'>
                    <img
                      src={props.post.profile?.image}
                      alt=''
                      className={"rounded-circle"}
                      style={{ height: "50px" }}
                    />
                  </Col>
                  <Col md={11} className='ml-2'>
                    <div>
                      <a as={Link} href={`/profile/${props.post.profile?.id}`}>
                        <span className='font-weight-bolder'>
                          {props.post.profile?.name}
                        </span>
                      </a>

                      {" · "}
                      <span className='text-muted font-weight-light'>2nd</span>
                    </div>
                    <div className='text-muted' style={{ fontSize: "0.8rem" }}>
                      <span>{dateDiff(props.post.createdAt, now)}</span>
                      {props.post.profile?.title}
                    </div>
                  </Col>
                </div>
                <div className='mt-3'>{props.post.text}</div>
                <div>
                  {" "}
                  {props.post?.image && (
                    <img
                      src={props.post.image}
                      alt='post'
                      className='img-fluid'
                    />
                  )}
                </div>
                <div
                  style={{ fontSize: "1rem" }}
                  className='mt-5 d-flex justify-content-start align-items-center'>
                  <img src={comments} alt='comment' />{" "}
                  <span className='mx-2'>{likes} </span>
                  <Button variant='link' onClick={state.onHandleComment}>
                    {noOfComments} comments
                  </Button>
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ paddingLeft: "0", paddingTop: "0" }}
                className=''>
                <hr></hr>
                <div className='d-flex flex-row justify-content-between'>
                  <Col md={2} className=' d-flex flex-row pl-0'>
                    <Button
                      variant='link'
                      className='d-flex flex-row'
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            api + "api/like/post/" + props.post.id,
                            {
                              method: "POST",
                              headers: {
                                "content-type": "application/json",
                              },
                              body: JSON.stringify({
                                profileId: userId,
                              }),
                            }
                          );
                          if (!res.ok) {
                            // setLikes(0);
                          } else {
                            try {
                              const res = await fetch(
                                api + "api/like/post/" + props.post.id
                              );
                              if (res.ok) {
                                const data = await res.json();
                                setLikes(data.likes);
                                setUpdate(true);
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      }}>
                      <ThumbsUpOutline
                        color={"#808080"}
                        title={"thumb"}
                        height='25px'
                        width='25px'
                      />
                      Like
                    </Button>
                  </Col>
                  <Col md={2} className=''>
                    <Button
                      variant='link'
                      onClick={state.onHandleComment}
                      className='d-flex flex-row'>
                      <ChatbubblesOutline
                        color={"#808080"}
                        title={"thumb"}
                        height='25px'
                        width='25px'
                      />
                      Comment
                    </Button>
                  </Col>
                  <Col md={2} className='d-flex flex-row ml-5'>
                    <ArrowRedoOutline
                      color={"#808080"}
                      title={"thumb"}
                      height='25px'
                      width='25px'
                    />
                    Share
                  </Col>
                  <Col md={2} className='d-flex flex-row ml-3'>
                    <SendOutline
                      color={"#808080"}
                      title={"thumb"}
                      height='25px'
                      width='25px'
                    />
                    Send
                  </Col>
                </div>
              </ListGroup.Item>
              {state.showComments && (
                <ListGroup.Item className='p-0 pt-3'>
                  <Comments
                    setUpdate={setUpdate}
                    userImage={props.image}
                    postId={props.post.id}></Comments>
                </ListGroup.Item>
              )}
            </ListGroup>
          </>
        )}
      />
    </Styles>
  );
};

export default PostBox;
