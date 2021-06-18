import React, { useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const ApiURL = process.env.REACT_APP_BE_URL;
const userId = localStorage.getItem("userId");

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [area, setArea] = useState("");
  const [email, setEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [profile, setProfile] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const login = async () => {
    try {
      const res = await fetch(`${ApiURL}/api/profile/${username}/${password}`);

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        localStorage.setItem("userId", data.id);
        props.history.push(`/profile/${data.id}`);
      } else {
        alert("Wrong credentials, try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signup = async () => {
    try {
      const newUser = {
        name: name,
        surname: surname,
        area: area,
        email: email,
        username: signupUsername,
        password: signupPassword,
      };
      const res = await fetch(`${ApiURL}/api/profile`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("userId", data.id);
        props.history.push(`/profile/${data.id}`);
      } else {
        alert("Wrong credentials, try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Form className='p-5'>
          <Form.Group className='mb-3' controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type='text'
              placeholder='Enter username'
            />
            <Form.Text className='text-muted'>
              Contact support if you have forgotten your username!
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
            />
          </Form.Group>

          <Button onClick={login} variant='primary' type='button'>
            Login
          </Button>
          <Button
            onClick={handleShow}
            className='ml-3'
            variant='primary'
            type='button'>
            SignUp
          </Button>
        </Form>

        {/* Modal */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>SignUp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type='text'
                  placeholder='Enter username'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='surname'>
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  type='text'
                  placeholder='Enter username'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='area'>
                <Form.Label>Area</Form.Label>
                <Form.Control
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  type='text'
                  placeholder='Enter username'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  placeholder='Enter email'
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId='signupUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  type='text'
                  placeholder='Enter username'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='signupPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  type='password'
                  placeholder='Password'
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={signup}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};

export default withRouter(Login);
