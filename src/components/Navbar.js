import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import './navbar.css'
function NavBar() {
    return (
        <div className="entry" style={{overflow: "hidden", width: "100%" }}>
            <Navbar className="color-bg fixed-top"  bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Eat and Treat</Navbar.Brand>
                    <Nav className="items">
                        <Nav.Link href="#features">Login</Nav.Link>
                        <Nav.Link href="#pricing">Sign up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar
