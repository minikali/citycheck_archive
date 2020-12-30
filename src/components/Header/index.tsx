import React, { useContext } from 'react';
import { LayoutContext } from '@/context/LayoutContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import AuthDropdown from '@/components/AuthDropdown';
import LangDropdown from '../LangDropdown';
import NavMenu from '../NavMenu';
import './style.scss';

const Header = () => {
  const { LogoUrl, BannerUrl } = useContext(LayoutContext);
  const { t } = useTranslation();

  return (
    <Container as='header' className='header'>
      <Row>
        <Col
          className='header__logo'
          xs={{ span: 5, order: 1 }}
          md={{ span: 3, order: 1 }}
          lg={{ span: 2, order: 1 }}
        >
          <Link href='/'>
            <a>
              <img src={LogoUrl} alt='Logo Citycheck' />
            </a>
          </Link>
        </Col>
        <Col
          className='header__title'
          xs={{ span: 12, order: 5 }}
          md={{ span: 6, order: 2 }}
          lg={{ span: 8, order: 2 }}
        >
          <h1>{t('header_title')}</h1>
        </Col>
        <Col
          className='header__lang-select'
          xs={{ span: 2, order: 2 }}
          md={{ span: 3, order: 3 }}
          lg={{ span: 2, order: 3 }}
        >
          <LangDropdown />
        </Col>
        <Col
          className='header__banner'
          xs={{ span: 12, order: 6 }}
          md={{ span: 12, order: 4 }}
        >
          <img src={BannerUrl} alt='Banner Citycheck' />
        </Col>
        <Col
          className='header__nav'
          xs={{ span: 3, order: 4 }}
          md={{ span: 8, offset: 2, order: 5 }}
        >
          <NavMenu />
        </Col>
        <Col
          className='header__auth'
          xs={{ span: 2, order: 3 }}
          md={{ span: 2, order: 6 }}
        >
          <AuthDropdown />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
