import {
  FETCHING,
  AUTHENTICATED,
  UNAUTHENTICATED,
  EMAIL_SENT,
  EMAIL_ERROR,
  EMAIL_TAKEN,
  EMAIL_INVALID,
  EMAIL_NOT_EXIST,
  USERNAME_TAKEN,
  ID_OR_PWD_INCORRECT,
  PASSWORD_NOT_MATCH,
  PASSWORD_TOO_SHORT,
  PROVIDE_PASSWORD,
} from '../actionType/actionTypes';

export const initialState = {
  user: null,
  status: UNAUTHENTICATED,
};

const AuthReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case AUTHENTICATED:
      sessionStorage.setItem('auth_cc', JSON.stringify(payload.data));
      return {
        user: payload.data,
        status: AUTHENTICATED,
      };
    case UNAUTHENTICATED:
      sessionStorage.removeItem('auth_cc');
      return {
        user: null,
        status: UNAUTHENTICATED,
      };
    case FETCHING: {
      return {
        user: null,
        status: FETCHING,
      };
    }
    case PASSWORD_TOO_SHORT:
      return {
        user: null,
        status: PASSWORD_TOO_SHORT,
      };
    case PASSWORD_NOT_MATCH:
      return {
        user: null,
        status: PASSWORD_NOT_MATCH,
      };
    case EMAIL_SENT:
      return {
        user: null,
        status: EMAIL_SENT,
      };
    case EMAIL_ERROR:
      return {
        user: null,
        status: EMAIL_ERROR,
      };
    case EMAIL_TAKEN:
      return {
        user: null,
        status: EMAIL_TAKEN,
      };
    case EMAIL_INVALID:
      return {
        user: null,
        status: EMAIL_INVALID,
      };
    case EMAIL_NOT_EXIST:
      return {
        user: null,
        status: EMAIL_NOT_EXIST,
      };
    case USERNAME_TAKEN:
      return {
        user: null,
        status: USERNAME_TAKEN,
      };
    case ID_OR_PWD_INCORRECT:
      return {
        user: null,
        status: ID_OR_PWD_INCORRECT,
      };
    case PROVIDE_PASSWORD:
      return {
        user: null,
        status: PROVIDE_PASSWORD,
      };
    default:
      return state;
  }
};

export default AuthReducer;
