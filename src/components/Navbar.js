import React from 'react';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'



export default () => {
    return (
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                <Navbar.Brand href="#">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav" className='justify-content-md-end'>
                    <Nav>
                        <Link to="/" className='nav-link'>Home</Link>
                        <Link to="/about" className='nav-link'>About</Link>
                        <Link to="/users" className='nav-link'>Users</Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>


    )
}