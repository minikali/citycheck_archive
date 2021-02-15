import { useEffect } from 'react';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

const useFacebook = (register, login, logout) => {
  const logToStrapiWithFacebook = async (name, id) => {
    const isLoggedIn = await login({ username: name, password: id });
    if (!isLoggedIn) {
      // Fake email and password to create strapi user account      
      register(id, id, id, name, `${id}@citycheck.fr`, 'facebook', id);
    }
  };

  const facebookLogin = () => {
    window.FB.login((response) => {
      if (response.status === 'connected') {
        // Retrieve name and userId from facebook API
        window.FB.api('/me', async ({ name, id }) => {
          logToStrapiWithFacebook(name, id);
        });
      }
    });
  };

  const facebookLogout = () => {
    logout();
    window.FB.logout(() => {
    });
  };

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APPID,
        cookie: true, // enable cookies to allow the server to access the local
        xfbml: true, // parse social plugins on this page
        version: 'v9.0', // use version 5.0
      });
      window.FB.getLoginStatus((response) => {
        // Called after the JS SDK has been initialized.
        if (response.status === 'connected') {
          // Retrieve name and userId from facebook API
          window.FB.api('/me', async ({ name, id }) => {
            logToStrapiWithFacebook(name, id);
          });
        }
      });
    };
  }, []);

  return { facebookLogin, facebookLogout };
};

export default useFacebook;
