import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LayoutContext } from '@/context/LayoutContext';

const Footer = () => {
  const { LogoUrl } = useContext(LayoutContext);

  return (
    <Container as='footer'>
      <Row>
        <Col xs={12}></Col>
        <Col xs={12}></Col>
        <Col xs={12}></Col>
        <Col xs={12}></Col>
      </Row>
    </Container>
  );
};

export default Footer;
