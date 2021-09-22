import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./navbar.css";

import Signup from './Signup';
import Login  from './Login';

function NavBar() {
  return (
    <div className="entry">
      <Navbar className="color-bg fixed-top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: 'none' }}>Eat and Treat</Link>
          </Navbar.Brand>
          <Nav className="items">
            <Nav.Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                {/* Login */}
                <Login />
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                {/* Sign up */}
                <Signup />
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
