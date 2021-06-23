import React from "react";
import "../css/MyNewsFeed.css";
import { withRouter } from "react-router-dom";
import PostBox from "./PostBox";
import MyLoader from "./ContentLoader";

class MyNewsFeed extends React.Component {
  render() {
    return (
      <>
        {this.props.posts.length > 0 ? (
          this.props.posts.map((post) => (
            <PostBox post={post} image={this.props.profile.image} />
          ))
        ) : (
          <MyLoader />
        )}
      </>
    );
  }
}

export default withRouter(MyNewsFeed);
