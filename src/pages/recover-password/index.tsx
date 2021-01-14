import Layout from '@/components/Layout';
import useRecoverPassword from '@/hooks/useRecoverPassword';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  SUCCESS,
  FETCHING,
  ERROR,
  PWD_TOO_SHORT,
  PWD_NOT_MATCH,
  CODE_WRONG_OR_EXPIRED,
} from '../../actionType/actionTypes';
import "./style.scss"

const RecoverPassword = () => {
  const { t } = useTranslation();
  const [pwd1, setPwd1] = useState('');
  const [pwd2, setPwd2] = useState('');
  const { status, submitNewPassword } = useRecoverPassword();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitNewPassword(pwd1, pwd2, router.query.code);
  };

  useEffect(() => {
    if (status === SUCCESS) {
      setPwd1('');
      setPwd2('');
    }
  }, [status]);

  return (
    <Layout>
      <Container className="recover-password">
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
            {status === SUCCESS && (
              <p className='text-green'>{t('modify_password')}</p>
            )}
            {status === PWD_TOO_SHORT && (
              <p className='text-danger'>{t('password_too_short')}</p>
            )}
            {status === PWD_NOT_MATCH && (
              <p className='text-danger'>{t('password_not_match')}</p>
            )}
            {status === CODE_WRONG_OR_EXPIRED && (
              <p className='text-danger'>{t('expired_link')}</p>
            )}
            {status === ERROR && (
              <p className='text-danger'>{t('error_occured')}</p>
            )}
            <Button
              variant='primary'
              type='submit'
              disabled={pwd1.length === 0 || pwd2.length === 0}
            >
              {status === FETCHING ? (
                <Spinner animation='border' />
              ) : (
                t('confirm_btn')
              )}
            </Button>
          </Form>
        </Card>
      </Container>
    </Layout>
  );
};

export default RecoverPassword;
