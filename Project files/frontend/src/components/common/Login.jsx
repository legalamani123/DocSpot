import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import photo1 from '../../images/photo1.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8001/api/user/login', user);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.userData));
        message.success('Login successfully');
        const isLoggedIn = JSON.parse(localStorage.getItem('userData'));
        const { type } = isLoggedIn;

        switch (type) {
  case 'admin':
    navigate('/adminhome');
    break;
  case 'user':
    navigate('/userhome');
    break;
  default:
    navigate('/login');
    break;
}
window.location.reload();

      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log("LOGIN ERROR RESPONSE:", error?.response?.data || error.message);
  message.error('Something went wrong');
    }
  };

  return (
    <>
      <Navbar expand="lg" className="px-4 py-2 shadow-sm" style={{ backgroundColor: '#cad8da' }}>
        <Container fluid>
          <Navbar.Brand style={{ fontWeight: '700', fontSize: '1.6rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#ffb800' }}>
              MediCareBook
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="ms-auto d-flex gap-4 align-items-center">
              <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: '500' }}>
                Home
              </Link>
              <Link to="/login" style={{ textDecoration: 'none', color: 'black', fontWeight: '500' }}>
                Login
              </Link>
              <Link to="/register" style={{ textDecoration: 'none', color: 'black', fontWeight: '500' }}>
                Register
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MDBContainer className="my-5">
        <MDBCard style={{ border: 'none' }}>
          <MDBRow style={{ backgroundColor: '#bfcfcf', borderRadius: '10px' }} className="g-0 p-4 align-items-center">
            <MDBCol md="6">
              <MDBCardImage src={photo1} alt="login form" className="rounded-start w-100" />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex mx-5 flex-column">
                <div className="d-flex flex-row mt-2 mb-5">
                  <span className="h1 fw-bold mb-0">Sign in to your account</span>
                </div>

                <Form onSubmit={handleSubmit}>
                  <label className="form-label" htmlFor="formControlLgEmail">Email</label>
                  <MDBInput
                    style={{
                      margin: '5px auto',
                      backgroundColor: '#e9f0ff',
                      borderRadius: '20px',
                      border: 'none',
                      padding: '10px 15px',
                      fontWeight: '500',
                    }}
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    id="formControlLgEmail"
                    type="email"
                    size="md"
                    autoComplete="off"
                  />
                  <label className="form-label" htmlFor="formControlLgPassword">Password</label>
                  <MDBInput
                    style={{
                      margin: '5px auto',
                      backgroundColor: '#e9f0ff',
                      borderRadius: '20px',
                      border: 'none',
                      padding: '10px 15px',
                      fontWeight: '500',
                    }}
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    id="formControlLgPassword"
                    type="password"
                    size="md"
                    autoComplete="off"
                  />
                  <Button
                    className="mb-4 px-5"
                    style={{
                      backgroundColor: '#ffcc00',
                      color: '#000',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '30px',
                      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                      marginTop: '20px',
                    }}
                    size="lg"
                    type="submit"
                  >
                    Let's Enter
                  </Button>
                </Form>
                <p className="mt-3" style={{ color: '#393f81' }}>
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color: '#393f81' }}>
                    Register here
                  </Link>
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Login;
