import React from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Header from '../Header';
import './style.scss';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
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
    </Head>
    <Container className='layout' fluid>
      <Header />
      {children}
    </Container>
  </>
);

export default Layout;
