import Layout from '@/components/Layout';
import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const RecoverPassword = () => {
  const { t } = useTranslation();
  const [pwd1, setPwd1] = useState('');
  const [pwd2, setPwd2] = useState('');

  return (
    <Layout>
      <Container>
        <Card>
          <h2>{t('choose_new_password')}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>{t('login_password')}</Form.Label>
              <Form.Control
                value={pwd1}
                type='password'
                onChange={(e) => setPwd1(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t('confirm_password')}</Form.Label>
              <Form.Control
                value={pwd2}
                type='password'
                onChange={(e) => setPwd2(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              {t('login_connect')}
            </Button>
          </Form>
        </Card>
      </Container>
    </Layout>
  );
};

export default RecoverPassword;
