import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import AddToYourFeed from "../components/AddToYourFeed";
import MyNewsFeed from "./../components/MyNewsFeed";
import Box from "./../components/parts/Box";
import Posts from "./../components/Posts";

import { CaretDownOutline } from "react-ionicons";
import WelcomeBox from "./../components/WelcomeBox";
import Groups from "./../components/Groups";
import LatestJobs from "./../components/LatestJobs";
import { checkImg } from "../helper/datediff";

const api = process.env.REACT_APP_BE_URL;

class Feed extends Component {
  state = {
    posts: [],
  };

  componentDidMount = () => {
    document.title = "Linkedin - Feed";
    this.getPosts();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.updated !== this.state.updated) {
      this.getPosts();
    }
  };

  getMyPosts = (e) => {
    e.preventDefault();
    const posts = this.props.posts;
    this.setState((state) => {
      return {
        posts: posts.filter((post) => {
          if (post.user?.id) {
            return post.user.id === this.props.profile.id;
          }
        }),
      };
    });
  };

  getPosts = async () => {
    try {
      const requestPosts = await fetch(api + "/post/", {
        method: "GET",
      });
      if (requestPosts.ok) {
        let resp = await requestPosts.json();
        // let filteredResp = await Promise.all(
        //   resp.filter(async (post) => await checkImg(post.image))
        // );
        this.setState({
          posts: resp.reverse(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdate = (e, bool) => {
    e.preventDefault();
    this.props.onDidUpdate(bool);
  };

  render() {
    return (
      <Row>
        <Col md={3}>
          <Box
            padding={false}
            render={(state) => <WelcomeBox profile={this.props.profile} />}
          />
          <Groups />
        </Col>
        <Col md={6}>
          <Posts
            bearerToken={this.props.bearerToken}
            profile={this.props.profile}
            rounded={true}
            onPostsClick={this.getMyPosts}
            onHandleUpdate={this.handleUpdate}
          />
          <Row className='m-0 pr-2 pl-2'>
            <Col md={10} className='p-0'>
              <hr />
            </Col>
            <Col md={2}>
              <button
                className='btn d-flex flex-row font-weight-bold px-0'
                style={{ fontSize: ".8rem" }}>
                <span className='text-nowrap font-weight-light'>Sort by: </span>{" "}
                Top
                <CaretDownOutline
                  color={"#00000"}
                  title={"caret"}
                  height='15px'
                  width='15px'
                />
              </button>
            </Col>
          </Row>

          <MyNewsFeed
            posts={this.state.posts}
            bearerToken={this.props.bearerToken}
            profile={this.props.profile}
            rounded={true}
            onPostsClick={this.getMyPosts}
            onHandleUpdate={this.handleUpdate}
          />
        </Col>
        <Col md={3}>
          <AddToYourFeed />
          <LatestJobs profile={this.props.profile} />
        </Col>
      </Row>
    );
  }
}

export default Feed;
