import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import SelectPhase from '@/components/SelectPhase';
import Card from 'react-bootstrap/Card';
import './style.scss';

const Suggest = () => {
  const [addr, setAddr] = useState();
  const mapRef = useRef(null);

  const MapWithoutSSR = React.useMemo(
    () =>
      dynamic(() => import('@components/Map'), {
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    []
  );
  const SearchBoxWithoutSSR = React.useMemo(
    () =>
      dynamic(() => import('@components/SearchBox'), {
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    []
  );
  const DraggableMarkerWithoutSSR = React.useMemo(
    () =>
      dynamic(() => import('@components/DraggableMarker'), {
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    []
  );
  const [map, setMap] = useState(null);
  const [phase, setPhase] = useState(1);
  const [description, setDescription] = useState('');
  const [justify, setJustify] = useState('');
  const [position, setPosition] = useState(null);
  const { t } = useTranslation();

  const handleAddr = (v) => {
    setAddr(v);
    if (v) {
      map.fitBounds(v.bounds);
    }
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSetMap = (m) => {
    setMap(m);
    setPosition(m.getCenter());
  };

  const handleChangeJustify = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJustify(e.target.value);
  };

  return (
    <Layout>
      <Container fluid className='suggest'>
        <Row>
          <Col ref={mapRef} md={9}>
            <MapWithoutSSR setMap={handleSetMap}>
              {position && (
                <DraggableMarkerWithoutSSR
                  position={position}
                  setPosition={setPosition}
                />
              )}
            </MapWithoutSSR>
          </Col>
          <Col md={3}>
            <Card>
              <Form>
                <Form.Group>
                  <Form.Label>{t('title')}</Form.Label>
                  <Form.Control type='email' />
                </Form.Group>

                <Form.Group>
                  <Form.Label>{t('suggest_label_address')}</Form.Label>
                  <SearchBoxWithoutSSR addr={addr} setAddr={handleAddr} />
                </Form.Group>
                <Form.Group>
                  <SelectPhase
                    label={t('suggest_label_choose_phase')}
                    setPhase={setPhase}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>{t('suggest_label_description')}</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={5}
                    onChange={handleChangeDescription}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>{t('suggest_label_justify')}</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    onChange={handleChangeJustify}
                    required
                  />
                </Form.Group>

                <Button variant='primary' type='submit'>
                  {t('confirm_btn')}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Suggest;
