import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import p2 from '../../images/p2.png';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from 'mdb-react-ui-kit';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    type: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8001/api/user/register', user);
      if (res.data.success) {
        message.success('Registered Successfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
      <div className="ms-auto d-flex gap-3 align-items-center">
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
          <MDBRow style={{ backgroundColor: '#cad8da' }} className="g-0 p-4 rounded-3 shadow-sm">
            <MDBCol md="6">
              <MDBCardBody className="d-flex mx-3 flex-column justify-content-center">
                <div className="d-flex flex-row mb-2">
                  <span className="h1 text-center fw-bold">Sign up to your account</span>
                </div>
                <div className="p-2">
                  <Form onSubmit={handleSubmit}>
                    <label className="my-1 form-label" htmlFor="formControlLg">Full name</label>
                    <MDBInput
                      style={{ height: '40px', borderRadius: '25px', paddingLeft: '15px' }}
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      id="formControlLg"
                      type="text"
                      size="sm"
                    />

                    <label className="my-1 form-label" htmlFor="formControlLg">Email</label>
                    <MDBInput
                      style={{ height: '40px', borderRadius: '25px', paddingLeft: '15px' }}
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      id="formControlLg"
                      type="email"
                      size="sm"
                    />

                    <label className="my-1 form-label" htmlFor="formControlLg">Password</label>
                    <MDBInput
                      style={{ height: '40px', borderRadius: '25px', paddingLeft: '15px' }}
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      id="formControlLg"
                      type="password"
                      size="sm"
                    />

                    <label className="my-1 form-label" htmlFor="formControlLg">Phone</label>
                    <MDBInput
                      style={{ height: '40px', borderRadius: '25px', paddingLeft: '15px' }}
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      id="formControlLg"
                      type="phone"
                      size="sm"
                    />

                    <Container className="my-3">
                      <MDBRadio
                        name="type"
                        id="inlineRadio1"
                        checked={user.type === 'admin'}
                        value="admin"
                        onChange={handleChange}
                        label="Admin"
                        inline
                      />
                      <MDBRadio
                        name="type"
                        id="inlineRadio2"
                        checked={user.type === 'user'}
                        value="user"
                        onChange={handleChange}
                        label="User"
                        inline
                      />
                    </Container>

                    <Button
                      style={{
                        marginTop: '20px',
                        backgroundColor: '#ffc107',
                        border: 'none',
                        fontWeight: '600',
                        borderRadius: '25px',
                        padding: '8px 25px',
                        color: 'black',
                      }}
                      className="mb-4"
                      size="lg"
                      type="submit"
                    >
                      Register
                    </Button>
                  </Form>

                  <p className="mb-5 pb-md-2" style={{ color: '#393f81' }}>
                    Have an account?{' '}
                    <Link to="/login" style={{ color: '#393f81' }}>
                      Login here
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCol>

            <MDBCol md="6">
              <MDBCardImage
                style={{ mixBlendMode: 'darken' }}
                src={p2}
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Register;
