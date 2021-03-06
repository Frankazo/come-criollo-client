import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link style={{ color: 'black' }} href="#restaurant">Restaurants</Nav.Link>
    <Nav.Link style={{ color: 'black' }} href="#change-password">Change Password</Nav.Link>
    <Nav.Link style={{ color: 'black' }} href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link style={{ color: 'black' }} href="#/">Home</Nav.Link>
    <Nav.Link style={{ color: 'black' }} href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link style={{ color: 'black' }} href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar expand="md">
    <Navbar.Brand> Come Criollo </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
