import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import LoginForm from '@/components/LoginForm';
import './style.scss';
import RegisterForm from '@/components/RegisterForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import { AUTHENTICATED } from '@/actionType/actionTypes';
import { AuthContext } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import Logout from '../Logout';

// eslint-disable-next-line arrow-body-style
const AuthDropdown = () => {
  const { userStatus, userinfo } = useContext(AuthContext);
  const { t } = useTranslation();
  const [dropdown, setDropdown] = useState('login');
  const [toggle, setToggle] = useState(false);
  const options = {
    login: <LoginForm setDropdown={setDropdown} setToggle={setToggle} />,
    register: <RegisterForm setDropdown={setDropdown} setToggle={setToggle} />,
    recover: <ForgotPasswordForm setDropdown={setDropdown} />,
    logout: <Logout setDropdown={setDropdown} setToggle={setToggle} />,
  };
  useEffect(() => {
    if (userStatus === AUTHENTICATED) setDropdown('logout');
  }, []);

  return (
    <Dropdown
      className='auth-dropdown'
      alignRight
      onToggle={(value) => setToggle(value)}
      show={toggle}
    >
      <Dropdown.Toggle variant='link'>
        {userStatus === AUTHENTICATED && (
          <span className='username'>
            {`${t('welcome')} ${userinfo.user.name}`}
          </span>
        )}
        <img
          width={30}
          height={30}
          src='assets/images/login-icon.png'
          alt='Login'
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>{options[dropdown]}</Dropdown.Menu>
    </Dropdown>
  );
};

export default AuthDropdown;
