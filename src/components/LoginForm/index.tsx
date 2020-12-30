import { AUTHENTICATED, ID_OR_PWD_INCORRECT } from '@/actionType/actionTypes';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import './style.scss';

const LoginForm = () => {
  const { t } = useTranslation();
  const {
    userStatus,
    login,
    facebookLogin,
    googleLogin,
    setToggle,
    setDropdown,
  } = useContext(AuthContext);

  const initialState = {
    username: '',
    password: '',
  };
  const [state, setState] = useState(initialState);
  const { username, password } = state;

  const setUsername = (value) => {
    setState({ ...state, username: value });
  };

  const setPassword = (value) => {
    setState({ ...state, password: value });
  };

  const handleLoginbtn = (social) => {
    if (social === 'facebook') facebookLogin();
    else if (social === 'google') googleLogin();
    setToggle(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ username, password });
    if (res) {
      setDropdown('logout');
      setToggle(false);
    }
  };

  useEffect(() => {
    if (userStatus === AUTHENTICATED) {
      setState(initialState);
    }
  }, [userStatus]);
  return (
    <div className='login-form'>
      <h3>{t('login_title')}</h3>
      <div className='social-connect'>
        <Button onClick={() => handleLoginbtn('facebook')}>
          <img
            width={30}
            height={30}
            src='assets/images/fb-connect-icon.png'
            alt='Facebook'
          />
          <span>{t('facebook_login')}</span>
        </Button>
        <Button onClick={() => handleLoginbtn('google')}>
          <img
            width={30}
            height={30}
            src='assets/images/google-connect-icon.png'
            alt='Google'
          />
          <span>{t('google_login')}</span>
        </Button>
      </div>
      <p className='hr-or'>{t('or')}</p>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>{t('login_username')}</Form.Label>
          <Form.Control
            type='text'
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>{t('login_password')}</Form.Label>
          <Form.Control
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {userStatus === ID_OR_PWD_INCORRECT && (
          <p className='text-danger'>{t('login_incorrect')}</p>
        )}
        <Button variant='primary' type='submit'>
          {t('login_connect')}
        </Button>
      </Form>
      <p className='register'>
        {t('not_yet_register')}
        <Button
          variant='link'
          onClick={() => setDropdown('register')}
          title={t('link_register')}
        >
          {t('link_register')}
        </Button>
      </p>
      <Button
        variant='link'
        onClick={() => setDropdown('recover')}
        title={t('link_password_forgotten')}
      >
        {t('link_password_forgotten')}
      </Button>
    </div>
  );
};

export default LoginForm;
