import React, { useEffect, useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import AsyncSelect from 'react-select/async';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-bootstrap/Spinner';
import './style.scss';

interface Props {
  addr: any;
  setAddr: (v: any) => void;
}

const SearchBox = ({ addr, setAddr }: Props) => {
  const [show, setShow] = useState(false);
  const [provider] = useState(new OpenStreetMapProvider());
  const { t } = useTranslation();

  const fetchData = async (inputValue) => {
    try {
      const results = await provider.search({ query: inputValue });
      return results.map(({ label, x, y, bounds }) => ({
        label,
        bounds,
        position: { lat: x, lng: y },
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const loadOptions = (inputValue) => {
    if (inputValue.length < 3) return [];
    return new Promise((resolve) => {
      resolve(fetchData(inputValue));
    });
  };

  const handleInputChange = (v: string) => {
    if (v?.length > 2) setShow(true);
    else setShow(false);
  };

  const handleChange = (v) => {
    setAddr(v);
  };

  const LoadingIndicator = () => (
    <div className='loading-indicator'>
      <Spinner animation='border' />
    </div>
  );

  useEffect(() => {
    console.log('addr', addr);
  }, [addr]);

  return (
    <div className='search-box'>
      <AsyncSelect
        placeholder={t('enter_address')}
        value={addr}
        className='async-select'
        classNamePrefix='async-select'
        loadOptions={loadOptions}
        cacheOptions
        onChange={handleChange}
        isClearable
        onInputChange={handleInputChange}
        menuIsOpen={show}
        components={{ LoadingIndicator }}
      />
    </div>
  );
};

export default SearchBox;
