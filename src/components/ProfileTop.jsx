import { Component } from "react";
import "../css/ProfileTop.css";
import { Row, Col, Button } from "react-bootstrap";
import CarouselBadge from "../components/parts/Carousel";
import CameraIcon from "../components/parts/CamerIcon";
import Box from "../components/parts/Box";
import LinkButton from "../components/parts/LinkButton";
import DropdownButton from "../components/parts/DropdownButton";
import UpdateImgProfileModal from "./UpdateImgProfileModal";
import EditProfile from "./EditProfile";
import EditButton from "./parts/EditButton";

const api = process.env.REACT_APP_BE_URL;
let userId = localStorage.getItem("userId");
export default class ProfileTop extends Component {
  state = {
    showModal: false,
    formData: {},
    uploadImageUrl: "",
    editProfile: false,
  };

  handleShowModal = () => {
    this.setState((state) => {
      return {
        showModal: !this.state.showModal,
      };
    });
  };

  handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    let form_data = new FormData();
    form_data.append("profileImage", file);
    this.setState((state) => {
      return {
        formData: form_data,
      };
    });
  };

  uploadImage = async () => {
    try {
      let newRes = await fetch(
        api + `api/profile/${userId}/uploadProfileImage`,
        {
          method: "POST",
          body: this.state.formData,
        }
      );
      if (newRes.ok) {
        console.log("FileUploaded");
        this.props.onDidUpdate();
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };

  render() {
    userId = localStorage.getItem("userId");
    return (
      <>
        <Box
          padding={false}
          render={(state) => (
            <Row className='m-0 p-0'>
              <Col id='ProfileBackground' sx={12}>
                <img
                  id='profileImage'
                  src={this.props.profile.image}
                  alt='profile_image'
                  onClick={this.handleShowModal}
                />
                <CameraIcon classname={"cameraIcon"} />
                <EditProfile
                  editProfile={this.state.editProfile}
                  editProfileOff={() => this.setState({ editProfile: false })}
                  editProfileOn={() => this.setState({ editProfile: true })}
                  token={this.props.bearerToken}
                />
                <EditButton
                  classname={"Pencil"}
                  editProfileOn={() => this.setState({ editProfile: true })}
                />
              </Col>
              <Col id='ProfileInfo' xs={12}>
                <h3>
                  {this.props.profile.name}
                  {"  "}
                  {this.props.profile.surname}
                </h3>
                <h5 style={{ fontWeight: "400" }}>
                  {this.props.profile.title}
                </h5>
                <p className='d-flex align-items-center'>
                  {this.props.profile.area}
                  {" - "}
                  {<LinkButton title={"500 connections"} />}
                  {" - "}
                  {<LinkButton title={"Contact info"} />}
                </p>{" "}
                <span className='d-flex flex-row'>
                  <DropdownButton
                    Name='Open to'
                    Background='primary'
                    Border='primary'
                  />
                  <DropdownButton
                    Name='Add profile section'
                    Background='outline-dark'
                    Border='dark'
                  />
                  <Button
                    style={{ borderRadius: "50px", marginRight: "10px" }}
                    variant='outline-dark'>
                    More...
                  </Button>
                </span>
                <Row>
                  <CarouselBadge />
                </Row>
              </Col>
            </Row>
          )}
        />
        <UpdateImgProfileModal
          image={this.props.profile.image}
          open={this.state.showModal}
          onHandleShowModal={this.handleShowModal}
          onHandleFileUpload={this.handleFileUpload}
          uploadImageUrl={this.state.uploadImageUrl}
          onUploadClick={this.uploadImage}
        />
      </>
    );
  }
}
