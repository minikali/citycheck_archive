import {
  FETCHING,
  AUTHENTICATED,
  EMAIL_SENT,
  EMAIL_TAKEN,
  EMAIL_INVALID,
  EMAIL_NOT_EXIST,
  USERNAME_TAKEN,
  ID_OR_PWD_INCORRECT,
  UNAUTHENTICATED,
  PROVIDE_PASSWORD,
  PASSWORD_NOT_MATCH,
} from '../actionType/actionTypes';

const useLogin = (dispatch) => {
  const logout = () => {
    dispatch({ type: UNAUTHENTICATED });
  };

  const register = async (
    username,
    password,
    password2,
    name,
    email = null,
    social = 'email',
    userId = null
  ) => {
    try {
      if (password !== password2) {
        dispatch({ type: PASSWORD_NOT_MATCH });
        throw Error('Password do not match');
      }
      dispatch({ type: FETCHING });
      const path = '/auth/local/register';
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            social,
            userId,
            name,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        const errorMsg = `${json.error}: ${json.message[0].messages[0].message}`;

        switch (json.message[0].messages[0].id) {
          case 'Auth.form.error.email.taken':
            dispatch({ type: EMAIL_TAKEN });
            throw new Error(errorMsg);
          case 'Auth.form.error.username.taken':
            dispatch({ type: USERNAME_TAKEN });
            throw new Error(errorMsg);
          case 'Auth.form.error.password.provide':
            dispatch({ type: PROVIDE_PASSWORD });
            throw new Error(errorMsg);
          default:
            throw new Error(errorMsg);
        }
      }
      dispatch({ type: AUTHENTICATED, payload: { data: json } });
      return json;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return null;
    }
  };

  const login = async ({ username, password }) => {
    try {
      dispatch({ type: FETCHING });
      const path = '/auth/local';
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: username,
            password,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        const errorMsg = `${json.error}: ${json.message[0].messages[0].message}`;
        switch (json.message[0].messages[0].id) {
          case 'Auth.form.error.invalid':
            dispatch({ type: ID_OR_PWD_INCORRECT });
            throw new Error(errorMsg);
          default:
            throw new Error(errorMsg);
        }
      }
      dispatch({ type: AUTHENTICATED, payload: { data: json } });
      return json;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return null;
    }
  };

  const resetPassword = async (email) => {
    try {
      dispatch({ type: FETCHING });
      const path = '/auth/forgot-password';
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      const json = await response.json();

      if (!response.ok) {
        const errorMsg = `${json.error}: ${json.message[0].messages[0].message}`;
        switch (json.message[0].messages[0].id) {
          case 'Auth.form.error.email.format':
            dispatch({ type: EMAIL_INVALID });
            throw new Error(errorMsg);
          case 'Auth.form.error.user.not-exist':
            dispatch({ type: EMAIL_NOT_EXIST });
            throw new Error(errorMsg);
          default:
            throw new Error(errorMsg);
        }
      }
      dispatch({ type: EMAIL_SENT });
      return json;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return null;
    }
  };

  return { register, login, resetPassword, logout };
};

export default useLogin;
