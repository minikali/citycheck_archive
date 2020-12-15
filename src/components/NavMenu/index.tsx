import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './style.scss';

const NavMenu = () => {
  const { t } = useTranslation();

  return (
    <Navbar className='nav-menu' bg='white' expand='md'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className=''>
          <Nav.Item>
            <Link href='/'>
              <a>{t('nav_home')}</a>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/about-us'>
              <a>{t('nav_about_us')}</a>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/suggest'>
              <a>{t('nav_suggest_place')}</a>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/contact'>
              <a>{t('nav_contact')}</a>
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavMenu;
