import {
  AUTHENTICATED,
  EMAIL_TAKEN,
  PASSWORD_NOT_MATCH,
  PASSWORD_TOO_SHORT,
  PROVIDE_PASSWORD,
  USERNAME_TAKEN,
} from '@/actionType/actionTypes';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import './style.scss';

interface Props {
  setDropdown: (s: string) => void;
  setToggle: (b: boolean) => void;
}

const RegisterForm = ({ setDropdown, setToggle }: Props) => {
  const { t } = useTranslation();
  const { userStatus, register } = useContext(AuthContext);
  // --- setter and getter form ---
  const initialState = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };
  const [state, setState] = useState(initialState);
  const setUsername = (value) => {
    setState({ ...state, username: value });
  };

  const setEmail = (value) => {
    setState({ ...state, email: value });
  };

  const setPassword = (value) => {
    setState({ ...state, password: value });
  };

  const setPassword2 = (value) => {
    setState({ ...state, password2: value });
  };
  const { username, email, password, password2 } = state;
  // --- submit form to register ---
  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password, password2, username, email, 'email');
    setToggle(false);
    setDropdown('logout');
  };
  // --- side effect ---
  useEffect(() => {
    if (userStatus === AUTHENTICATED) {
      setState(initialState);
    }
  }, [userStatus]);

  return (
    <div className='register-form'>
      <h3>{t('title_create_account')}</h3>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>{t('login_username')}</Form.Label>
          <Form.Control
            type='text'
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t('register_email')}</Form.Label>
          <Form.Control
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t('login_password')}</Form.Label>
          <Form.Control
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t('confirm_password')}</Form.Label>
          <Form.Control
            type='password'
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        {userStatus === EMAIL_TAKEN && (
          <p className='text-danger'>{t('email_taken')}</p>
        )}
        {userStatus === USERNAME_TAKEN && (
          <p className='text-danger'>{t('username_taken')}</p>
        )}
        {userStatus === PASSWORD_NOT_MATCH && (
          <p className='text-danger'>{t('password_not_match')}</p>
        )}
        {userStatus === PASSWORD_TOO_SHORT && (
          <p className='text-danger'>{t('password_too_short')}</p>
        )}
        {userStatus === PROVIDE_PASSWORD && (
          <p className='text-danger'>{t('provide_password')}</p>
        )}
        <Button variant='primary' type='submit'>
          {t('register_btn')}
        </Button>
      </Form>
      <p className='login'>
        {t('already_register')}
        <Button
          variant='link'
          onClick={() => setDropdown('login')}
          title={t('connect_btn')}
        >
          {t('connect_btn')}
        </Button>
      </p>
    </div>
  );
};

export default RegisterForm;
