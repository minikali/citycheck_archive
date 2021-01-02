/* eslint-disable camelcase */
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { useTranslation } from 'react-i18next';
import './style.scss';

interface Props {
  project_histories: any[];
}

// eslint-disable-next-line arrow-body-style
const HistorySuggest = ({ project_histories }: Props) => {
  const { t, i18n } = useTranslation();
  const [activeKey, setActiveKey] = useState(null);

  const List = (project_histories || [])
    .slice(0, 10)
    .map(
      ({
        id,
        created_at: createdAt,
        user,
        phase,
        justify_fr: jFr,
        justify_en: jEn,
        name,
      }) => {
        const date = new Date(createdAt).toLocaleDateString('fr-FR');
        const author = !user ? 'Admin' : name.split(' ')[0];

        return (
          <li key={id}>
            <p className='author'>
              {`${t('history_on')} ${date} ${t('history_by')} ${author}`}
            </p>
            <p className={`phase phase_${phase}`}>{t(`phase_${phase}`)}</p>
            <p className='description'>{i18n.language === 'fr' ? jFr : jEn}</p>
          </li>
        );
      }
    );

  return (
    <Accordion
      className='history-confirmation'
      onSelect={(e) => setActiveKey(e)}
    >
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          className={`${activeKey === '0' ? 'active' : ''}`}
          eventKey='0'
        >
          <img
            width={15}
            height={8}
            src='assets/images/arrow.png'
            alt='arrow'
          />
          {t('list_old_label')}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <ul>{List}</ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default HistorySuggest;
