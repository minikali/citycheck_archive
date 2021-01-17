import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import SelectPhase from '@/components/SelectPhase';
import Card from 'react-bootstrap/Card';
import { AuthContext } from '@/context/AuthContext';
import useSuggestSite from '@/hooks/useSuggestSite';
import './style.scss';
import { AUTHENTICATED, ERROR, SUCCESS } from '@/actionType/actionTypes';
import FeedbackModal from '@/components/FeedbackModal';

interface Props {
  meta: {
    title: string;
    description: string;
  };
}

const Suggest = ({ meta }: Props) => {
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
  const SimpleMarkerWithoutSSR = React.useMemo(
    () =>
      dynamic(() => import('@/components/SimpleMarker'), {
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    []
  );
  const initialFormData = {
    title: '',
    address: null,
    phase: 1,
    description: '',
    justify: '',
  };
  const { userinfo, userStatus, setToggle } = useContext(AuthContext);
  const { status, sendSuggestion } = useSuggestSite();
  const [map, setMap] = useState(null);
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState(initialFormData);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    message: '',
    variant: 'success',
  });
  const handleAddr = (address) => {
    setFormData({
      ...formData,
      address,
    });
    if (address) {
      map.fitBounds(address.bounds);
    }
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleChangeJustify = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, justify: e.target.value });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userStatus === AUTHENTICATED) {
      const form = {
        ...formData,
        address: formData.address.label,
        position: formData.address.position,
        lat: formData.address.position.lat,
        lng: formData.address.position.lng,
      };
      sendSuggestion(form, userinfo.id, i18n.language);
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    if (status === SUCCESS) {
      setModal({
        show: true,
        message: t('suggest_modif_thanks'),
        variant: 'success',
      });
      setFormData(initialFormData);
    } else if (status === ERROR) {
      setModal({
        show: true,
        message: t('suggest_modif_thanks'),
        variant: 'error',
      });
    }
  }, [status]);

  useEffect(() => {
    if (userStatus === AUTHENTICATED) setShow(false);
  }, [userinfo]);

  return (
    <Layout meta={meta}>
      <Container fluid className='suggest'>
        <Row>
          <Col md={9}>
            <MapWithoutSSR setMap={setMap}>
              {formData.address?.position && (
                <SimpleMarkerWithoutSSR
                  position={formData.address.position}
                  phase={formData.phase}
                />
              )}
            </MapWithoutSSR>
          </Col>
          <Col md={3}>
            <Card className='position-relative'>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>{t('title')}</Form.Label>
                  <Form.Control
                    type='text'
                    value={formData.title}
                    onChange={handleChangeTitle}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>{t('suggest_label_address')}</Form.Label>
                  <SearchBoxWithoutSSR
                    addr={formData.address}
                    setAddr={handleAddr}
                  />
                </Form.Group>
                <Form.Group>
                  <SelectPhase
                    label={t('suggest_label_choose_phase')}
                    setPhase={(n: number) =>
                      setFormData({ ...formData, phase: n })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>{t('suggest_label_description')}</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={5}
                    value={formData.description}
                    onChange={handleChangeDescription}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>{t('suggest_label_justify')}</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    value={formData.justify}
                    onChange={handleChangeJustify}
                    required
                  />
                </Form.Group>

                <Button variant='primary' type='submit'>
                  {t('confirm_btn')}
                </Button>
              </Form>
              {show && (
                <div className='login-overlay'>
                  <p>{t('suggest_label_identify_interact')}</p>
                  <Button variant='link' onClick={() => setToggle(true)}>
                    <img
                      width={30}
                      height={30}
                      src='assets/images/login-icon.png'
                      alt='Login'
                    />
                  </Button>
                </div>
              )}
            </Card>
            <FeedbackModal
              show={modal.show}
              onHide={() =>
                setModal({ show: false, message: '', variant: 'success' })
              }
            >
              {modal.message}
            </FeedbackModal>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seos?_limit=-1&label=suggest`
  );
  const json = await response.json();
  const meta = {
    title: json[0].title,
    description: json[0].description,
  };

  return { props: { meta } };
};

export default Suggest;
