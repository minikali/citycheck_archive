import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import SelectPhase from '@/components/SelectPhase';
import Form from 'react-bootstrap/Form';
import TextArea from '@/components/UserInput/TextArea';
import './style.scss';
import { AuthContext } from '@/context/AuthContext';
import FeedbackModal from '@/components/FeedbackModal';
import Button from 'react-bootstrap/Button';

interface Props {
  show: boolean;
  onHide: () => void;
  idFr: number;
  idEn: number;
}

// eslint-disable-next-line arrow-body-style
const SuggestModal = ({ show, onHide, idFr, idEn }: Props) => {
  const [justify, setJustify] = useState('');
  const [phase, setPhase] = useState(1);
  const { t } = useTranslation();
  const { userinfo } = useContext(AuthContext);
  const [modal, setModal] = useState({
    show: false,
    message: '',
  });

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
        show: true,
        message: t('suggest_modif_thanks'),
      });
    } else {
      setModal({
        show: true,
        message: t('suggest_modif_error'),
      });
    }
    onHide();
  };

  return (
    <>
      <Modal className='suggest-modal' show={show} onHide={onHide} centered>
        <h2>{t('suggest_modif_title')}</h2>
        <Form onSubmit={handleSubmit}>
          <SelectPhase label={t('change_phase_needed')} setPhase={setPhase} />
          <TextArea
            domId='justify-suggestion'
            label={t('suggest_modif_justify_briefly')}
            value={justify}
            setValue={setJustify}
            required
          />
          <Button type='submit'>{t('submit_btn_suggest')}</Button>
        </Form>
      </Modal>
      <FeedbackModal
        show={modal.show}
        onHide={() => setModal({ show: false, message: '' })}
      >
        {modal.message}
      </FeedbackModal>
    </>
  );
};

export default SuggestModal;
