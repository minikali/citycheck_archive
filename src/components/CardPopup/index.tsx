import { GeojsonProperty } from '@/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Popup } from 'react-leaflet';
import './style.scss';

interface Props {
  properties: GeojsonProperty;
}

const CardPopup = ({ properties }: Props) => {
  // eslint-disable-next-line camelcase
  const { phase, title, description, updated_at } = properties;
  const { t } = useTranslation();

  const update = new Date(updated_at).toLocaleDateString();

  return (
    <Popup>
      <h2>{t(`phase_${phase}`)}</h2>
      <h3 className='title'>{title}</h3>
      <p className='description'>{description}</p>
      <p className='date'>{`${t('updated_on')} ${update}`}</p>
    </Popup>
  );
};

export default CardPopup;
