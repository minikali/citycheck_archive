import { useReducer } from 'react';
import RecoverPasswordReducer, {
  initialState,
} from '@/reducer/RecoverPasswordReducer';
import {
  SUCCESS,
  FETCHING,
  ERROR,
  PWD_TOO_SHORT,
  PWD_NOT_MATCH,
  CODE_WRONG_OR_EXPIRED,
} from '../actionType/actionTypes';

const useRecoverPassword = () => {
  const [{ status }, dispatch] = useReducer(
    RecoverPasswordReducer,
    initialState
  );

  const submitNewPassword = async (pwd1, pwd2, code) => {
    dispatch({ type: FETCHING });
    if (!code) dispatch({ type: CODE_WRONG_OR_EXPIRED });
    else if (pwd1.length < 6) dispatch({ type: PWD_TOO_SHORT });
    else if (pwd1 !== pwd2) dispatch({ type: PWD_NOT_MATCH });
    else {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            password: pwd1,
            passwordConfirmation: pwd2,
          }),
        });
        const json = await response.json();
        if (!response.ok) {
          switch (json.message[0].messages[0].id) {
            case 'Auth.form.error.code.provide':
              dispatch({ type: CODE_WRONG_OR_EXPIRED });
              throw new Error(json.message[0].messages[0].message);
            default:
              dispatch({ type: ERROR });
              throw new Error();
          }
        }
        dispatch({ type: SUCCESS });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { status, submitNewPassword };
};

export default useRecoverPassword;
