import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import LangDropdown from '../LangDropdown';
import './style.scss';

const Header = () => {
  const [LogoUrl, setLogoUrl] = useState(null);
  const [BannerUrl, setBannerUrl] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/layouts`
        );
        if (response.status !== 200)
          throw Error(`Error code ${response.status}`);
        const json = await response.json();
        setBannerUrl(
          process.env.NEXT_PUBLIC_API_URL +
            json.filter(({ label }) => label === 'banner').shift().media.url
        );
        setLogoUrl(
          process.env.NEXT_PUBLIC_API_URL +
            json.filter(({ label }) => label === 'logo').shift().media.url
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container as='header' className='header' fluid>
      <Row>
        <Col className='header__logo' xs={{ span: 2, order: 1 }}>
          <img src={LogoUrl} alt='Logo Citycheck' />
        </Col>
        <Col className='header__title' xs={{ span: 12, order: 4 }}>
          <h1>{t('header_title')}</h1>
        </Col>
        <Col className='header__lang-select' xs={{ span: 8, order: 2 }}>
          <LangDropdown />
        </Col>
        <Col className='header__banner' xs={{ span: 12, order: 5 }}>
          banner
          {/* <img src={BannerUrl} alt='Banner Citycheck' /> */}
        </Col>
        <Col xs={{ span: 2, order: 3 }}>menu</Col>
      </Row>
    </Container>
  );
};

export default Header;
