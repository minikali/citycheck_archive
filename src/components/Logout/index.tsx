import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import "./style.scss";

interface Props {
  setDropdown: (s: string) => void;
  setToggle: (b: boolean) => void;
}

const Logout = ({ setDropdown, setToggle }: Props) => {
  const { userinfo, facebookLogout, googleLogout, logout } = useContext(
    AuthContext
  );
  const { t } = useTranslation();

  const handleLogout = () => {
    if (userinfo.user.social === 'facebook') facebookLogout();
    else if (userinfo.user.social === 'google') googleLogout();
    else if (userinfo.user.social === 'email') logout();
    setDropdown('login');
    setToggle(false);
  };
  return <Button className="btn-logout" onClick={() => handleLogout()}>{t('logout_btn')}</Button>;
};

export default Logout;
