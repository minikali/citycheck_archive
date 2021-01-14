import {
  SUCCESS,
  FETCHING,
  ERROR,
  UNKNOWN,
  PWD_TOO_SHORT,
  PWD_NOT_MATCH,
  CODE_WRONG_OR_EXPIRED,
} from '../actionType/actionTypes';

export const initialState = {
  status: UNKNOWN,
  error: null,
};

const AuthReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SUCCESS:
      return {
        ...initialState,
        status: SUCCESS,
      };
    case FETCHING:
      return {
        ...initialState,
        status: FETCHING,
      };
    case ERROR:
      return {
        ...initialState,
        status: ERROR,
        error: payload,
      };
    case UNKNOWN:
      return {
        ...initialState,
        status: UNKNOWN,
      };
    case PWD_TOO_SHORT:
      return {
        ...initialState,
        status: PWD_TOO_SHORT,
      };
    case PWD_NOT_MATCH:
      return {
        ...initialState,
        status: PWD_NOT_MATCH,
      };
    case CODE_WRONG_OR_EXPIRED:
      return {
        ...initialState,
        status: CODE_WRONG_OR_EXPIRED,
      };
    default:
      return state;
  }
};

export default AuthReducer;
