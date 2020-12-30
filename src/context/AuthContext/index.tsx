import React, { createContext, useState } from 'react';
import useAuth from '@/hooks/useAuth';

export const AuthContext = createContext<any>({});

interface Props {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  // useAuth
  // This hooks handles authentication
  const [
    { user: userinfo, status: userStatus },
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
  ] = useAuth();

  const [dropdown, setDropdown] = useState('login');
  const [toggle, setToggle] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        userinfo,
        userStatus,
        register,
        login,
        resetPassword,
        logout,
        facebookLogin,
        facebookLogout,
        googleLogin,
        googleLogout,
        toggle,
        setToggle,
        dropdown,
        setDropdown,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
