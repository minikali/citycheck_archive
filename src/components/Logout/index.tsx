import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import './style.scss';

const Logout = () => {
  const {
    userinfo,
    facebookLogout,
    googleLogout,
    logout,
    setDropdown,
    setToggle,
  } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleLogout = () => {
    if (userinfo.user.social === 'facebook') facebookLogout();
    else if (userinfo.user.social === 'google') googleLogout();
    else if (userinfo.user.social === 'email') logout();
    setDropdown('login');
    setToggle(false);
  };
  return (
    <Button className='btn-logout' onClick={() => handleLogout()}>
      {t('logout_btn')}
    </Button>
  );
};

export default Logout;
