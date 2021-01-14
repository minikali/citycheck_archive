import { SUCCESS, FETCHING, ERROR, UNKNOWN } from '../actionType/actionTypes';

export const initialState = {
  status: UNKNOWN,
  error: null,
};

const SuggestSiteReducer = (state = initialState, { type, payload }: any) => {
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
    default:
      return state;
  }
};

export default SuggestSiteReducer;
