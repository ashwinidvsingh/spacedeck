import React from 'react'
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {Navbar as NavBar} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <NavBar bg="light" data-bs-theme="light">
    <Container>
      <NavBar.Brand href="/">
      <img
        src={logo}
        width="80"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      </NavBar.Brand>
      {/* <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav> */}
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/gallery" eventKey="link-1">Space Gallery</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
              Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  </NavBar>
  )
}

export default Navbar