import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import "./style.scss"

const LangSelect = () => {
  const { i18n } = useTranslation();
  const options = [
    {
      key: 'fr',
      label: <img src='assets/images/french-flag.png' alt='French' />,
    },
    {
      key: 'en',
      label: <img src='assets/images/english-flag.png' alt='English' />,
    },
  ];

  return (
    <>
      <Dropdown
        className='lang-dropdown'
        onSelect={(eventKey) => {
          i18n.changeLanguage(eventKey);
          localStorage.setItem('i18nextLang', eventKey);
        }}
      >
        <Dropdown.Toggle>
          {options.find(({ key }) => key === i18n.language).label}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options
            .filter(({ key }) => key !== i18n.language)
            .map(({ key, label }) => (
              <Dropdown.Item eventKey={key}>{label}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default LangSelect;
