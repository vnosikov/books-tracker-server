import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Header = ({ authStatus }) => (
  <Navbar bg="light">
    <Link className="navbar-brand" to="/">
      Books Tracker
    </Link>
    <Nav.Item className="ml-auto">
      {authStatus && <Nav.Link href="/api/logout">Logout</Nav.Link>}
      {authStatus === false && <Nav.Link href="/auth/google">Login with Google</Nav.Link>}
      {authStatus === undefined && <Spinner animation="border" variant="primary" size="sm" />}
    </Nav.Item>
  </Navbar>
);  


Header.propTypes = {
  authStatus: PropTypes.oneOf([true, false, undefined]).isRequired,
}

export default Header;
