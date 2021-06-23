import React from "react";
import Box from "./parts/Box";
import { Row } from "react-bootstrap";
import { Col, Form, FormControl, Button } from "react-bootstrap";

import {
  CalendarOutline,
  DocumentTextOutline,
  FilmOutline,
  ImageOutline,
} from "react-ionicons";
import { useDispatch } from "react-redux";

const Posts = (props) => {
  const dispatch = useDispatch();
  return (
    <Box
      padding={true}
      render={(state) => (
        <>
          <Row className='d-flex flex-nowrap mx-1'>
            <Col md={1} className='pl-0'>
              <img
                src={props.profile.image}
                alt=''
                className={props.rounded && "rounded-circle"}
                style={{ height: "50px" }}
              />
            </Col>
            <Col md={11} className='ml-2'>
              <Form inline>
                <FormControl
                  type='button'
                  placeholder='Start a post'
                  className='mr-sm-2 rounded-pill flex-grow-1 text-left'
                  onClick={() => dispatch({ type: "SHOW_POST_MODAL" })}
                  style={{ height: "50px" }}
                  value='Start a post'
                />
              </Form>
            </Col>
          </Row>
          <Row className='mr-2 mt-1 d-flex justify-content-between'>
            <Button variant='' onClick={(e) => props.onPostsClick(e)}>
              <ImageOutline
                color={"#70B5F9"}
                title={"search"}
                height='20px'
                width='20px'
                className='mx-2'
              />
              Photos
            </Button>
            <Button variant='' onClick={(e) => props.onPostsClick(e)}>
              <FilmOutline
                color={"#7FC15E"}
                title={"search"}
                height='20px'
                width='20px'
                className='mr-2'
              />
              Video
            </Button>
            <Button variant='' onClick={(e) => props.onPostsClick(e)}>
              <CalendarOutline
                color={"#E7A33E"}
                title={"search"}
                height='20px'
                width='20px'
                className='mr-2'
              />
              Event
            </Button>
            <Button variant='' onClick={(e) => props.onPostsClick(e)}>
              <DocumentTextOutline
                color={"#F5987E"}
                title={"search"}
                height='20px'
                width='20px'
                className='mr-2'
              />
              Posts
            </Button>
          </Row>
        </>
      )}
    />
  );
};

export default Posts;
