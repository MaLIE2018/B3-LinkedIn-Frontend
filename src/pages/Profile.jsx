import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import About from "../components/About";
import ProfileTop from "../components/ProfileTop";
import Dashboard from "../components/Dashboard";
import Activity from "../components/Activity";
import Experience from "../components/Experience";
import PeopleAlsoViewed from "../components/PeopleAlsoViewed";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  state = {
    currProfileId: null,
  };

  componentDidMount() {
    document.title = `Linkedin - Profile ${this.props.profile.name} `;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.match.params.id !== this.state.currProfileId) {
      this.setState((state) => {
        return { currProfileId: this.props.match.params.id };
      });
      this.props.onCurrProfileChange(this.props.match.params.id);
      console.log("this.props.profile.name:", this.props.profile.name);
    }
    document.title = `Linkedin - Profile ${this.props.profile.name} `;
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
                <ProfileTop
                  profile={this.props.profile}
                  bearerToken={this.props.bearerToken}
                  onDidUpdate={this.props.onDidUpdate}
                />
                <About bio={this.props.profile.bio} />
                {!this.state.currProfileId && <Dashboard />}
                <Activity profile={this.props.profile} />
                <Experience
                  profileId={profileId}
                  bearerToken={this.props.bearerToken}
                />
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

export default withRouter(Profile);
