import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import './style.scss';
import LangSelect from '../LangSelect';

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
    <Container as='header' className="header" fluid>
      <Row>
        <Col className="header__logo" xs={2}>
          <img src={LogoUrl} alt='Logo Citycheck' />
        </Col>
        <Col className="header__title" xs={8}>
          <h1>{t('header_title')}</h1>
        </Col>
        <Col className="header__lang-select" xs={2}>
          <LangSelect />
        </Col>
        <Col className="header__banner" xs={12}>
          {/* <img src={BannerUrl} alt='Banner Citycheck' /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
