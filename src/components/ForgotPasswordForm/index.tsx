import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { EMAIL_SENT, FETCHING } from '@/actionType/actionTypes';
import { AuthContext } from '@/context/AuthContext';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
  setDropdown: (s: string) => void;
}

const ForgotPasswordForm = ({ setDropdown }: Props) => {
  const { t } = useTranslation();
  const { userStatus, resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetPassword(email);
  };

  useEffect(() => {
    if (userStatus === EMAIL_SENT) setEmail('');
  }, [userStatus]);

  return (
    <div className='forgot-form'>
      <h3>{t('reset_password_title')}</h3>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>{t('register_email')}</Form.Label>
          <Form.Control
            value={email}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          disabled={userStatus === FETCHING}
        >
          {userStatus === FETCHING ? (
            <Spinner animation='border' />
          ) : (
            t('send_btn')
          )}
        </Button>
        {userStatus === EMAIL_SENT && (
          <>
            <p className='text-green'>{t('email_sent')}</p>
          </>
        )}
      </Form>
      <p>
        <Button variant='link' onClick={() => setDropdown('register')}>
          {t('link_register')}
        </Button>
        |
        <Button variant='link' onClick={() => setDropdown('login')}>
          {t('connect_btn')}
        </Button>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
