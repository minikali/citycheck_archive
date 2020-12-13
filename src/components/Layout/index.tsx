import React from 'react';
import LayoutContextProvider from '@/context/LayoutContext';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Header from '../Header';
import './style.scss';
import Footer from '../Footer';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { ready } = useTranslation();

  return (
    <>
      {/* TODO : SPINNER */}
      {!ready && <p>Loading...</p>}
      {ready && (
        <>
          <Head>
            <meta
              name='viewport'
              content='initial-scale=1.0, width=device-width'
            />
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
              href='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
              integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk'
              crossOrigin='anonymous'
            />
          </Head>
          <Container className='layout' fluid>
            <LayoutContextProvider>
              <Header />
              {children}
              <Footer />
            </LayoutContextProvider>
          </Container>
        </>
      )}
    </>
  );
};

export default Layout;
