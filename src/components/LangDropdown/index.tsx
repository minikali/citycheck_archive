// Modules
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

// Components
import Dropdown from 'react-bootstrap/Dropdown';

// Others
import './style.scss';

const LangDropdown = () => {
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
              <Dropdown.Item key={uuidv4()} eventKey={key}>
                {label}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default LangDropdown;
