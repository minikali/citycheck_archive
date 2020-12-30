import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import SelectPhase from '@/components/SelectPhase';
import Form from 'react-bootstrap/Form';
import TextArea from '@/components/UserInput/TextArea';
import './style.scss';

interface Props {
  show: boolean;
  onHide: () => void;
}

// eslint-disable-next-line arrow-body-style
const SuggestModal = ({ show, onHide }: Props) => {
  const [justify, setJustify] = useState();
  const [phase, setPhase] = useState(1);
  const { t } = useTranslation();

  const handleHide = () => {
    onHide();
  };

  const postSuggest = async (params) => {
    try {
      const currentLang = localStorage.getItem('i18nextLang') || 'fr';
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project-suggestions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phase,
            french_project: params.idFr,
            english_project: params.idEn,
            user: params.userId,
            justify_fr: currentLang === 'fr' ? justify : null,
            justify_en: currentLang === 'en' ? justify : null,
            valid: false,
            name: params.name,
          }),
        }
      );
      const json = await response.json();

      if (!response.ok) throw new Error(json);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postSuggest({
      idFr,
      idEn,
      userId: userinfo.user.id,
      phase,
      justify,
      name: userinfo.name,
    });
    if (res) {
      setModal({
        ...modal,
        show: true,
        message: t('suggest_modif_thanks'),
      });
    } else {
      setModal({
        ...modal,
        show: true,
        message: t('suggest_modif_error'),
        settings: { ...modal.settings, error: true },
      });
    }
    handleHide();
  };

  return (
    <Modal show={show} onHide={handleHide}>
      <h1>{t('suggest_modif_title')}</h1>
      <Form onSubmit={handleSubmit}>
        <SelectPhase label={t('change_phase_needed')} setPhase={setPhase} />
        <TextArea
          domId='justify-suggestion'
          label={t('suggest_modif_justify_briefly')}
          value={justify}
          setValue={setJustify}
          required
        />
      </Form>
    </Modal>
  );
};

export default SuggestModal;
