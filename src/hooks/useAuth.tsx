import { useReducer } from 'react';
import AuthReducer, { initialState } from '../reducer/AuthReducer';
import useLogin from './useLogin';
import useFacebook from './useFacebook';
import useGoogle from './useGoogle';
import { AUTHENTICATED } from '../actionType/actionTypes';

// Allows to login, logout, check status, from facebook
// Creates a new user in the DB if never visited the website

const useAuth = () => {
  const [{ user, status }, dispatch] = useReducer(AuthReducer, {}, () => {
    const auth =
      typeof window === 'undefined' ? null : sessionStorage.getItem('auth_cc');
    return auth
      ? { user: JSON.parse(auth), status: AUTHENTICATED }
      : initialState;
  });
  const { register, login, resetPassword, logout } = useLogin(dispatch);
  const { facebookLogin, facebookLogout } = useFacebook(
    register,
    login,
    logout
  );
  const { googleLogin, googleLogout } = useGoogle(register, login, logout);

  return [
    { user, status },
    {
      register,
      login,
      resetPassword,
      logout,
      facebookLogin,
      facebookLogout,
      googleLogin,
      googleLogout,
    },
  ];
};

export default useAuth;
