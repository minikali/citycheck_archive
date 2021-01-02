/* eslint-disable camelcase */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import FeedbackModal from '@/components/FeedbackModal';
import { GeojsonProperty } from '@/types';
import { useTranslation } from 'react-i18next';
import HistoryConfirmation from '@/components/HistoryConfimation';
import HistorySuggest from '@/components/HistorySuggest';
import './style.scss';

interface Props {
  show: boolean;
  onHide: () => void;
  properties: GeojsonProperty;
}

const HistoryModal = ({ show, onHide, properties }: Props) => {
  const {
    phase,
    title,
    updated_at,
    userinfo,
    justify,
    project_confirmations,
    project_histories,
  } = properties;
  const { t } = useTranslation();
  const [modal, setModal] = useState({
    show: false,
    message: '',
  });

  const date = new Date(updated_at).toLocaleDateString('fr-FR');
  const update = `${t('updated_on')} ${date}`;

  return (
    <>
      <Modal className='history-modal' show={show} onHide={onHide} centered>
        <h2>{title}</h2>
        <p className={`phase phase__${phase}`}>{t(`phase_${phase}`)}</p>
        <div className='info'>
          {userinfo?.user && <p className='author'>{userinfo.user.name}</p>}
          <p className='description'>{justify}</p>
          <p className='date'>{update}</p>
        </div>
        <HistoryConfirmation project_confirmations={project_confirmations} />
        <HistorySuggest project_histories={project_histories} />
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

export default HistoryModal;
