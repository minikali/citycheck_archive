import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import "./style.scss"

// eslint-disable-next-line arrow-body-style
const NavMenu = () => {
  return (
    <Navbar className="nav-menu" bg='white' expand='md'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className=''>
          <Nav.Item>
            <Link href='/'>
              <a>Accueil</a>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/about-us'>
              <a>Qui sommes-nous</a>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/suggest'>
              <a>Suggérer un lieu</a>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/about-us'>
              <a>Contact</a>
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavMenu;
