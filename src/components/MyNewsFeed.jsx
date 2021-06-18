import React from "react";
import "../css/MyNewsFeed.css";
import PostsModal from "./PostsModal";
import { withRouter } from "react-router-dom";
import PostBox from "./PostBox";
import MyLoader from "./ContentLoader";

const api = process.env.REACT_APP_BE_URL;

class MyNewsFeed extends React.Component {
  state = {
    post: {
      text: "",
    },
    formData: undefined,
    showModal: false,
    currentPost: {
      text: "",
    },
  };

  handleUpdatePost = async (e, method, id) => {
    e.preventDefault();
    try {
      let response = await fetch(api + "/api/post/" + id, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.currentPost),
      });
      if (response.ok) {
        console.log("Post successfully updated");
        if (this.state.formData !== undefined && method !== "DELETE") {
          const data = await response.json();
          let newRes = await fetch(
            api + "/api/post/" + data[0].id + "/uploadPostImage",
            {
              method: "POST",
              body: this.state.formData,
            }
          );
          if (newRes.ok) {
            console.log("FileUploaded");
          }
        }
        this.props.onHandleUpdate();
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.log(`Something went wrong! ${error}`);
    }
  };

  handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    let form_data = new FormData();
    form_data.append("postImage", file);
    this.setState((state) => {
      return {
        formData: form_data,
      };
    });
  };

  handleChange = (e) => {
    this.setState((state) => {
      return {
        post: { text: e.target.value },
        currentPost: {
          ...this.state.currentPost,
          text: e.target.value,
        },
      };
    });
  };

  handleShowModal = () => {
    this.setState((state) => {
      return {
        showModal: !this.state.showModal,
      };
    });
  };
  handleEditButtonClick = (e, post = {}) => {
    e.preventDefault();
    this.setState((state) => {
      return { currentPost: post, showModal: !this.state.showModal };
    });
  };

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
        <PostsModal
          currentPost={this.state.currentPost}
          onHandleUpdatePost={this.handleUpdatePost}
          currentProfileId={this.props.profile.id}
          onHandleFileUpload={this.handleFileUpload}
          open={this.state.showModal}
          onHandleShowModal={this.handleShowModal}
          onHandleChange={this.handleChange}
          rounded={this.props.rounded}
          profile={this.props.profile}
          text={this.state.currentPost.text}
        />
      </>
    );
  }
}

export default withRouter(MyNewsFeed);
