import { Modal, Form } from "react-bootstrap";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { update } from "../actions/update.js";

const api = process.env.REACT_APP_BE_URL;
let userId = localStorage.getItem("userId");

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formerName: false,
      profile: {
        name: "",
        surname: "",
        title: "",
        area: "",
      },
    };
  }

  update = () => {
    this.props.update();
  };

  getProfile = async () => {
    try {
      const request = await fetch(api + "/api/profile/" + userId, {
        method: "GET",
      });
      if (request.ok) {
        const response = await request.json();
        this.setState({
          profile: {
            name: response.name,
            surname: response.surname,
            title: response.title,
            area: response.area,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getProfile();
  }

  handleData = (event) => {
    const value = event.target.value;
    const id = event.target.id;
    this.setState({
      profile: {
        ...this.state.profile,
        [id]: value,
      },
    });
  };

  updateProfile = async (event) => {
    event.preventDefault();

    try {
      const request = await fetch(api + "/api/profile/" + userId, {
        method: "PUT",
        body: JSON.stringify(this.state.profile),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (request.ok) {
        const response = await request.json();
        this.props.editProfileOff();
      } else {
        console.log("I could not updated your profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    userId = localStorage.getItem("userId");
    return (
      <>
        <Modal
          size='lg'
          show={this.props.editProfile}
          onHide={this.props.editProfileOff}
          aria-labelledby='example-modal-sizes-title-lg'>
          <Modal.Header closeButton>
            <Modal.Title
              id='example-modal-sizes-title-lg'
              style={{ fontWeight: "350" }}>
              Edit Intro
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.updateProfile(e);
                return this.props.setUpdate();
              }}>
              <div className='container-fluid mx-0 px-0'>
                <div className='row justify-content-between mt-4'>
                  <div className='col-6 text-muted'>First Name *</div>
                  <div className='col-6 text-muted'>Last Name *</div>
                </div>
                <div className='row justify-content-between'>
                  <div className='col-6 w-100'>
                    <input
                      value={this.state.profile.name}
                      onChange={this.handleData}
                      id='name'
                      className='w-100'
                      type='text'
                    />
                  </div>
                  <div className='col-6 w-100'>
                    <input
                      value={this.state.profile.surname}
                      onChange={this.handleData}
                      id='surname'
                      className='w-100'
                      type='text'
                    />
                  </div>
                </div>
                <div className='row mt-2 w-100'>
                  <div className='col-12'>
                    <a
                      onClick={() =>
                        this.setState({ formerName: !this.state.formerName })
                      }
                      href='/'>
                      Add former name
                    </a>
                  </div>
                </div>
                <div className='row'>
                  {this.state.formerName ? (
                    <>
                      <div className='col-12 w-100'>
                        <label htmlFor='formerName' className='text-muted'>
                          Former Name
                        </label>
                      </div>
                      <div className='col-12 w-100'>
                        <input
                          className='w-100'
                          type='text'
                          placeholder='Type in your former name'
                        />
                      </div>
                    </>
                  ) : (
                    <div className='col-12'></div>
                  )}
                </div>
                <div className='row w-100 mt-4 mb-2'>
                  <div className='col-12 text-muted'>
                    + Record name pronunciation
                  </div>
                  <div className='col-12'>
                    Name pronunciation can only be added using our mobile app.
                  </div>
                </div>
                <div className='row w-100 mx-0 px-0'>
                  <div className='col-12 text-muted'>Headline *</div>
                  <div className='col-12 w-100'>
                    <textarea
                      onChange={this.handleData}
                      value={this.state.profile.title}
                      className='textarea'
                      name='headline'
                      id='title'
                      rows='2'></textarea>
                  </div>
                </div>
                <div className='row w-100 mt-5 mb-4'>
                  <div className='col-12'>
                    <a href='/'>+ Add current position</a>
                  </div>
                </div>
                <div className='row w-100'>
                  <div className='col-12 w-100'>
                    <Form.Group controlId='education'>
                      <Form.Label className='text-muted'>
                        Education *
                      </Form.Label>
                      <Form.Control as='select'>
                        <option>Select</option>
                        <option>Strive School</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div className='col-12'>
                    <a href='/'> Add new education</a>
                  </div>
                </div>
                <div className='row mt-3 mb-3'>
                  <div className='col-12 d-flex justify-content-start align-items-center'>
                    <input className='' type='checkbox' id='intro' />
                    <label className='text-muted' htmlFor='intro'>
                      Show education in my intro
                    </label>
                  </div>
                </div>
                <div className='row w-100 mb-3'>
                  <div className='col-12 mb-1 text-muted'>Country/Region *</div>
                  <div className='col-12'>
                    <input
                      onChange={this.handleData}
                      id='area'
                      value={this.state.profile.area}
                      className='w-100'
                      type='text'
                    />
                  </div>
                </div>
                <div className='row w-100'>
                  <div className='col-3 w-100 text-muted'>Postal code</div>
                  <div className='col-9 w-100 text-muted'>
                    Location within this area
                  </div>
                </div>
                <div className='row w-100 mb-3'>
                  <div className='col-3 w-100'>
                    <input className='w-100' type='text' disabled />
                  </div>
                  <div className='col-9 w-100'>
                    <input className=' w-100' type='text' disabled />
                  </div>
                </div>
                <div className='row w-100'>
                  <div className='col-12'>
                    <Form.Group controlId='industry'>
                      <Form.Label className='text-muted'>Industry *</Form.Label>
                      <Form.Control as='select'>
                        <option value=''>Choose an industry…</option>
                        <option>Accounting</option>
                        <option>Airlines/Aviation</option>
                        <option>Alternative Dispute Resolution</option>
                        <option>Alternative Medicine</option>
                        <option>Animation</option>
                        <option>Apparel &amp; Fashion</option>
                        <option>Architecture &amp; Planning</option>
                        <option>Arts &amp; Crafts</option>
                        <option>Automotive</option>
                        <option>Aviation &amp; Aerospace</option>
                        <option>Banking</option>
                        <option>Biotechnology</option>
                        <option>Broadcast Media</option>
                        <option>Building Materials</option>
                        <option>Business Supplies &amp; Equipment</option>
                        <option>Capital Markets</option>
                        <option>Chemicals</option>
                        <option>Civic &amp; Social Organization</option>
                        <option>Civil Engineering</option>
                        <option>Commercial Real Estate</option>
                        <option>Computer &amp; Network Security</option>
                        <option>Computer Games</option>
                        <option>Computer Hardware</option>
                        <option>Computer Networking</option>
                        <option>Computer Software</option>
                        <option>Construction</option>
                        <option>Consumer Electronics</option>
                        <option>Consumer Goods</option>
                        <option>Consumer Services</option>
                        <option>Cosmetics</option>
                        <option>Dairy</option>
                        <option>Defense &amp; Space</option>
                        <option>Design</option>
                        <option>E-learning</option>
                        <option>Education Management</option>
                        <option>
                          Electrical &amp; Electronic Manufacturing
                        </option>
                        <option>Entertainment</option>
                        <option>Environmental Services</option>
                        <option>Events Services</option>
                        <option>Executive Office</option>
                        <option>Facilities Services</option>
                        <option>Farming</option>
                        <option>Financial Services</option>
                        <option>Fine Art</option>
                        <option>Fishery</option>
                        <option>Food &amp; Beverages</option>
                        <option>Food Production</option>
                        <option>Fundraising</option>
                        <option>Furniture</option>
                        <option>Gambling &amp; Casinos</option>
                        <option>Glass, Ceramics &amp; Concrete</option>
                        <option>Government Administration</option>
                        <option>Government Relations</option>
                        <option>Graphic Design</option>
                        <option>Health, Wellness &amp; Fitness</option>
                        <option>Higher Education</option>
                        <option>Hospital &amp; Health Care</option>
                        <option>Hospitality</option>
                        <option>Human Resources</option>
                        <option>Import &amp; Export</option>
                        <option>Individual &amp; Family Services</option>
                        <option>Industrial Automation</option>
                        <option>Information Services</option>
                        <option>Information Technology &amp; Services</option>
                        <option>Insurance</option>
                        <option>International Affairs</option>
                        <option>International Trade &amp; Development</option>
                        <option>Internet</option>
                        <option>Investment Banking</option>
                        <option>Investment Management</option>
                        <option>Judiciary</option>
                        <option>Law Enforcement</option>
                        <option>Law Practice</option>
                        <option>Legal Services</option>
                        <option>Legislative Office</option>
                        <option>Leisure, Travel &amp; Tourism</option>
                        <option>Libraries</option>
                        <option>Logistics &amp; Supply Chain</option>
                        <option>Luxury Goods &amp; Jewelry</option>
                        <option>Machinery</option>
                        <option>Management Consulting</option>
                        <option>Maritime</option>
                        <option>Market Research</option>
                        <option>Marketing &amp; Advertising</option>
                        <option>Mechanical Or Industrial Engineering</option>
                        <option>Media Production</option>
                        <option>Medical Device</option>
                        <option>Medical Practice</option>
                        <option>Mental Health Care</option>
                        <option>Military</option>
                        <option>Mining &amp; Metals</option>
                        <option>Mobile Games</option>
                        <option>Motion Pictures &amp; Film</option>
                        <option>Museums &amp; Institutions</option>
                        <option>Music</option>
                        <option>Nanotechnology</option>
                        <option>Newspapers</option>
                        <option>Non-profit Organization Management</option>
                        <option>Oil &amp; Energy</option>
                        <option>Online Media</option>
                        <option>Outsourcing/Offshoring</option>
                        <option>Package/Freight Delivery</option>
                        <option>Packaging &amp; Containers</option>
                        <option>Paper &amp; Forest Products</option>
                        <option>Performing Arts</option>
                        <option>Pharmaceuticals</option>
                        <option>Philanthropy</option>
                        <option>Photography</option>
                        <option>Plastics</option>
                        <option>Political Organization</option>
                        <option>Primary/Secondary Education</option>
                        <option>Printing</option>
                        <option>Professional Training &amp; Coaching</option>
                        <option>Program Development</option>
                        <option>Public Policy</option>
                        <option>Public Relations &amp; Communications</option>
                        <option>Public Safety</option>
                        <option>Publishing</option>
                        <option>Railroad Manufacture</option>
                        <option>Ranching</option>
                        <option>Real Estate</option>
                        <option>Recreational Facilities &amp; Services</option>
                        <option>Religious Institutions</option>
                        <option>Renewables &amp; Environment</option>
                        <option>Research</option>
                        <option>Restaurants</option>
                        <option>Retail</option>
                        <option>Security &amp; Investigations</option>
                        <option>Semiconductors</option>
                        <option>Shipbuilding</option>
                        <option>Sporting Goods</option>
                        <option>Sports</option>
                        <option>Staffing &amp; Recruiting</option>
                        <option>Supermarkets</option>
                        <option>Telecommunications</option>
                        <option>Textiles</option>
                        <option>Think Tanks</option>
                        <option>Tobacco</option>
                        <option>Translation &amp; Localization</option>
                        <option>Transportation/Trucking/Railroad</option>
                        <option>Utilities</option>
                        <option>Venture Capital &amp; Private Equity</option>
                        <option>Veterinary</option>
                        <option>Warehousing</option>
                        <option>Wholesale</option>
                        <option>Wine &amp; Spirits</option>
                        <option>Wireless</option>
                        <option>Writing &amp; Editing</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'> Contact info </div>
                  <div className='col-12 mt-2'>
                    Profile URL, Email
                    <hr className='bg-dark' />
                  </div>
                </div>
                <div className='row mt-1 '>
                  <div className='col-12'>
                    <hr />
                  </div>
                  <div className='col-12 d-flex justify-content-end'>
                    <button
                      className='btn btn-primary rounded-pill'
                      type='submit'>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUpdate: () => dispatch(update()),
});

const mapStateToProps = (state) => state;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
