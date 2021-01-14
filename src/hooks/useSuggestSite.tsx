import { useReducer } from 'react';
import SuggestSiteReducer, { initialState } from '@/reducer/SuggestSiteReducer';
import { SUCCESS, FETCHING, ERROR } from '../actionType/actionTypes';

const useSuggestSite = () => {
  const [{ status }, dispatch] = useReducer(SuggestSiteReducer, initialState);

  const sendSuggestion = async (data, userId, lang) => {
    try {
      dispatch({ type: FETCHING });
      const path = lang === 'fr' ? '/french-projects' : '/english-projects';
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            valid: false,
            user: userId,
          }),
        }
      );
      if (!response.ok) {
        dispatch({ type: ERROR });
        throw new Error();
      }
      dispatch({ type: SUCCESS });
    } catch (error) {
      console.error(error);
    }
  };

  return { status, sendSuggestion };
};

export default useSuggestSite;
