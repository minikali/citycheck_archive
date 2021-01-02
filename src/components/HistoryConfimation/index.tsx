/* eslint-disable camelcase */
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { useTranslation } from 'react-i18next';
import './style.scss';

interface Props {
  project_confirmations: any[];
}

// eslint-disable-next-line arrow-body-style
const HistoryConfirmation = ({ project_confirmations }: Props) => {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState(null);

  const confirmationList = (project_confirmations || [])
    .slice(0, 10)
    .map((item) => {
      const { id, user, name, created_at: createdAt } = item;
      const username = !user ? 'Admin' : name.split(' ')[0];
      const date = new Date(createdAt).toLocaleDateString('fr-FR');

      return <li key={id}>{`${username} ${t('confirmed_on')} ${date}`}</li>;
    });

  return (
    <Accordion
      className='history-suggestion'
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
          {`${project_confirmations ? project_confirmations.length : '...'} ${t(
            'people_confirm_attribute'
          )}`}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <ul>{confirmationList}</ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default HistoryConfirmation;
