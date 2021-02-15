import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gapi: any;
  }
}

const useGoogle = (register, login, logout) => {
  const [auth2, setAuth2] = useState(null);

  const logToStrapiWithGoogle = async (name, id) => {
    const isLoggedIn = await login({ username: id, password: id });
    if (!isLoggedIn) {
      // Fake email and password to create strapi user account
      await register(name, id, id, name, `${id}@citycheck.fr`, 'google', id);
    }
  };

  const googleLogin = () => {    
    auth2.signIn().then((response) => {
      const username = response.getBasicProfile().getName();
      const socialId = response.getBasicProfile().getId();
      logToStrapiWithGoogle(username, socialId);
    });
  };

  const googleLogout = () => {
    auth2.signOut().then(() => {
      logout();
    });
  };

  useEffect(() => {
    window.gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      setAuth2(
        window.gapi.auth2.init({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          // scope: 'additional_scope'
        })
      );
    });
  }, []);

  return { googleLogin, googleLogout };
};

export default useGoogle;
