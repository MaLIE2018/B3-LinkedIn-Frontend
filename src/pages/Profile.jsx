import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import About from "../components/About";
import ProfileTop from "../components/ProfileTop";
import Dashboard from "../components/Dashboard";
import Activity from "../components/Activity";
import Experience from "../components/Experience";
import PeopleAlsoViewed from "../components/PeopleAlsoViewed";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { selectedProfile } from "../actions/update.js";
const api = process.env.REACT_APP_BE_URL;

const userId = localStorage.getItem("userId");

class Profile extends Component {
  state = {
    currProfileId: null,
  };

  componentDidMount() {
    document.title = `Linkedin - Profile ${this.props.profile.name} `;
    this.getProfile();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.profile.id !== this.props.profile.id) {
      this.getProfile();
    }
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getProfile();
    }
    document.title = `Linkedin - Profile ${this.props.profile.name} `;
  };

  getProfile = async () => {
    try {
      const res = await fetch(
        api + "/api/profile/" + this.props.match.params.id
      );
      if (res.ok) {
        const data = await res.json();
        this.props.setCurrentProfile(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const profileId = this.props.profile.id;
    return (
      <>
        {" "}
        <Row>
          <Col md={8}>
            {profileId && (
              <>
                <ProfileTop profile={this.props.profile} />
                <About bio={this.props.profile.bio} />
                {!this.props.match.params.id == userId && <Dashboard />}
                <Activity profile={this.props.profile} />
                <Experience profileId={profileId} />
              </>
            )}
          </Col>
          <Col md={4}>
            <PeopleAlsoViewed />
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { profile: state.selectedProfile };
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentProfile: (profile) => dispatch(selectedProfile(profile)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
