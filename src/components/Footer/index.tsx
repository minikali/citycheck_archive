// Modules
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

// Components
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Others
import { LayoutContext } from '@/context/LayoutContext';
import getFooterPaths from '@/utils/getFooterPath';
import SocialButtons from '../SocialButtons';
import './style.scss';

const Footer = () => {
  const [about, setAbout] = useState([]);
  const [info, setInfo] = useState([]);

  const { LogoUrl } = useContext(LayoutContext);
  const { t, i18n } = useTranslation();

  const date = new Date();
  const updateDate = `${`0${date.getMonth() + 1}`.slice(
    -2
  )}/${date.getFullYear()}`;

  useEffect(() => {
    (async () => {
      const paths = await getFooterPaths();
      setAbout(
        paths.filter(
          ({ params }) =>
            params.lang === i18n.language && params.route === 'apropos'
        )
      );
      setInfo(
        paths.filter(
          ({ params }) =>
            params.lang === i18n.language &&
            params.route === 'informationslegales'
        )
      );
    })();
  }, [i18n.language]);

  return (
    <Container as='footer' className='footer'>
      <Row>
        <Col className='footer__logo' xs={12} lg={3}>
          <Link href='/'>
            <a>
              <img src={LogoUrl} alt='Logo Citycheck' />
            </a>
          </Link>
        </Col>
        <Col className='footer__infomation' xs={12} sm={6} md={4} lg={3}>
          <p className='title'>{t('footer_legal_information')}</p>
          <ul>
            {info.map(({ params }) => {
              const { title, slug } = params;
              return (
                <li key={uuidv4()}>
                  <Link href='/[slug]' as={`/${slug}`}>
                    <a>{title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col className='footer__about' xs={12} sm={6} md={4} lg={3}>
          <p className='title'>{t('footer_about')}</p>
          <ul>
            {about.map(({ params }) => {
              const { title, slug } = params;
              return (
                <li key={uuidv4()}>
                  <Link href='/[slug]' as={`/${slug}`}>
                    <a>{title}</a>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href='/[slug]' as='/sitemap'>
                {t('sitemap')}
              </Link>
            </li>
          </ul>
        </Col>
        <Col
          className='footer__social'
          xs={12}
          sm={{ span: 6, offset: 6 }}
          md={{ span: 4, offset: 0 }}
          lg={3}
        >
          <SocialButtons />
        </Col>
        <Col className='footer__copyright' xs={12} sm={12}>
          <p>{t('copyright')}</p>
          <p>
            {`${t('footer_last_update')} `}
            {updateDate && <span>{updateDate}</span>}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
