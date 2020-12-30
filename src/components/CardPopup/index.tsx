/* eslint-disable camelcase */
import { GeojsonProperty } from '@/types';
import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Popup } from 'react-leaflet';
import { AUTHENTICATED } from '@/actionType/actionTypes';
import { AuthContext } from '@/context/AuthContext';
import useCard from '@/hooks/useCard';
import FeedbackModal from '@/components/FeedbackModal';
import './style.scss';

interface Props {
  properties: GeojsonProperty;
}

const CardPopup = ({ properties }: Props) => {
  const {
    id,
    phase,
    title,
    description,
    updated_at,
    project_confirmations,
    english_project,
    french_project,
  } = properties;
  const { userStatus, userinfo, setToggle } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const { confirmCard, isSuggested } = useCard();
  const [modal, setModal] = useState({
    show: false,
    message: '',
  });
  const update = new Date(updated_at).toLocaleDateString();

  const getProjectIds = () => {
    let idFr = null;
    let idEn = null;
    if (i18n.language === 'fr') {
      idFr = id;
      idEn = english_project.id;
    } else {
      idEn = id;
      idFr = french_project.id;
    }
    return { idFr, idEn };
  };

  const isConfirmed = () => {
    if (!userinfo) return false;
    return (
      project_confirmations.filter(
        ({ user }) => user && user.toString() === userinfo.user.id.toString()
      ).length > 0
    );
  };

  const handleConfirm = async () => {
    const { idFr, idEn } = getProjectIds();
    const res = await confirmCard(
      idFr,
      idEn,
      userinfo.user.id,
      userinfo.user.name
    );
    if (res) {
      setModal({
        show: true,
        message: t('confirm_thanks'),
      });
    } else {
      setModal({
        show: true,
        message: t('confirm_error'),
      });
    }
  };

  const handleSuggestModif = async () => {
    const { idFr, idEn } = getProjectIds();
    const isSuggest = await isSuggested(idFr, idEn, userinfo.user.id);
    if (!isSuggest) openSuggestModif(idFr, idEn);
    else {
      setModal({
        ...modal,
        show: true,
        message: t('suggest_modif_already'),
        settings: { ...modal.settings, error: true, ms: 5000 },
      });
    }
  };

  return (
    <Popup>
      <Card className='card-popup'>
        <Card.Header>
          <h2>{t(`phase_${phase}`)}</h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <p className='description'>{description}</p>
            <p className='date'>{`${t('updated_on')} ${update}`}</p>
          </Card.Text>
          <Card.Footer>
            {userStatus !== AUTHENTICATED && (
              <div className='unauthenticated'>
                <p>{t('suggest_label_identify_interact')}</p>
                <Button
                  onClick={() => setToggle(true)}
                  title={t('login_btn')}
                  variant='link'
                >
                  <img
                    width={30}
                    height={30}
                    src='assets/images/login-icon.png'
                    alt='Login'
                  />
                </Button>
              </div>
            )}
            <div
              className={`card-buttons ${
                userStatus !== AUTHENTICATED && 'disable'
              }`}
            >
              {!isConfirmed() && (
                <div className='confirm-btn'>
                  <Button
                    onClick={() => handleConfirm()}
                    disabled={userStatus !== AUTHENTICATED}
                  >
                    {t('confirm_btn_lowercase')}
                  </Button>
                </div>
              )}
              <div className='suggest-btn'>
                <Button
                  type='button'
                  onClick={() => handleSuggestModif()}
                  disabled={userStatus !== AUTHENTICATED}
                >
                  {t('card_suggest_modif')}
                </Button>
              </div>
            </div>
            <div className='card-history'>
              <Button
                variant='link'
                onClick={() => openHistoryCard(id)}
                disabled={userStatus !== AUTHENTICATED}
              >
                {t('card_see_history')}
              </Button>
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
      <FeedbackModal
        show={modal.show}
        onHide={() => setModal({ show: false, message: '' })}
      >
        {modal.message}
      </FeedbackModal>
    </Popup>
  );
};

export default CardPopup;
