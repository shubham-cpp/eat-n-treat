import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./navbar.css";
function NavBar() {
  return (
    <div className="entry">
      <Navbar className="color-bg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">Eat and Treat</Link>
          </Navbar.Brand>
          <Nav className="items">
            <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/signup">Sign up</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
