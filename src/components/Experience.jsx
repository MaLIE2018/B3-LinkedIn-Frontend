import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Box from "../components/parts/Box";
import ItemsList from "../components/parts/ItemsList";
import ModalExperience from "./ModelExperience";

const api = process.env.REACT_APP_BE_URL;

let userId = localStorage.getItem("userId");

class Experience extends Component {
  state = {
    experiences: [],
    currentExperience: {},
    updated: false,
    open: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.updated !== this.state.updated) {
      this.postExp();
    }
  }

  postExp = async () => {
    const id = this.props.match.params?.id;
    if (id) userId = id;
    try {
      const newUrl = api + "/api/experience/" + userId + "/user";
      const response = await fetch(newUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.setState((state) => {
          return {
            experiences: data.sort((a, b) =>
              a.startDate > b.startDate ? -1 : 1
            ),
            updated: false,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.postExp();
  }

  handleEditButtonClick = (e, item = {}) => {
    e.preventDefault();
    this.setState((state) => {
      return { currentExperience: item, open: !this.state.open };
    });
  };

  handleShowModal = () => {
    this.setState((state) => {
      return {
        open: !this.state.open,
      };
    });
  };

  handleUpdate = (bool) => {
    console.log("Updating...");
    this.setState((state) => {
      return { updated: bool, open: false, currentExperience: {} };
    });
  };

  render() {
    userId = localStorage.getItem("userId");
    return this.state.experiences.length !== 0 ? (
      <Box
        add={true}
        onEditButtonClick={this.handleEditButtonClick}
        title='Experience'
        render={(state) => (
          <>
            <ItemsList
              rounded={false}
              edit={true}
              onEditButtonClick={this.handleEditButtonClick}
              items={this.state.experiences}
            />
            <ModalExperience
              profileId={this.props.profileId}
              bearerToken={this.props.bearerToken}
              onUpdate={this.handleUpdate}
              item={this.state.currentExperience}
              open={this.state.open}
              onShowModal={this.handleShowModal}
            />
          </>
        )}
      />
    ) : (
      <Box
        add={true}
        onEditButtonClick={this.handleEditButtonClick}
        title='Experience'
        render={(state) => (
          <>
            <div>Add an Experience</div>
            <ModalExperience
              profileId={this.props.profileId}
              bearerToken={this.props.bearerToken}
              onUpdate={this.handleUpdate}
              item={this.state.currentExperience}
              open={this.state.open}
              onShowModal={this.handleShowModal}
            />
          </>
        )}
      />
    );
  }
}

export default withRouter(Experience);
