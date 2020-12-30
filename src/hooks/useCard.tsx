import React from 'react';

const useCard = () => {
  const isProjectConfirmed = async (idFr, idEn, userId) => {
    // if the array is not empty, the user already confirmed this project
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/project-confirmations?user=${userId}&french_project=${idFr}&english_project=${idEn}`;
      const response = await fetch(url);
      const json = await response.json();

      if (!response.ok) throw new Error(json);
      if (json.length > 0)
        throw new Error(`Project ${idFr}(fr)/${idEn}(en) already confirmed`);
      return false;
    } catch (err) {
      console.error(err);
      return true;
    }
  };

  const confirmCard = async (idFr, idEn, userId, username) => {
    // 1 Check pin not confirmed by user
    // 2 confirm card
    // retrieve pins again
    try {
      const isConfirmed = await isProjectConfirmed(idFr, idEn, userId);
      if (isConfirmed) return false;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project-confirmations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: userId,
            french_project: idFr,
            english_project: idEn,
            name: username,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) throw new Error(json);
      // getPins();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  const isSuggested = async (idFr, idEn, userId) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/project-suggestions?user=${userId}&french_project=${idFr}&english_project=${idEn}&valid=false`;
      const response = await fetch(url);
      const json = await response.json();

      if (!response.ok) throw new Error(json);
      if (json.length > 0)
        throw new Error(`Project ${idFr}(fr)/${idEn}(en) already suggested`);
      return false;
    } catch (err) {
      console.error(err);
      return true;
    }
  };

  return { confirmCard, isSuggested };
};

export default useCard;
