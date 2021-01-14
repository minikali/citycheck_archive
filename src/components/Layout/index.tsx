// Modules
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { initGA, logPageView } from '@/utils/analytics';

// Components
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';

// Others
import './style.scss';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { ready } = useTranslation();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();

    if (typeof window !== 'undefined') {
      ((d, s, id) => {
        let js;
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        // eslint-disable-next-line prefer-const
        js = d.createElement(s);
        js.id = id;
        js.src =
          'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
          integrity='sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=='
          crossOrigin=''
        />
        <script
          src='https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
          integrity='sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=='
          crossOrigin=''
        />
        <script
          type='text/javascript'
          src='https://apis.google.com/js/plusone.js'
        />
      </Head>
      {!ready && <Spinner animation='border' role='status' />}
      {ready && (
        <Container className='layout' fluid>
          <Header />
          {children}
          <Footer />
        </Container>
      )}
    </>
  );
};

export default Layout;
