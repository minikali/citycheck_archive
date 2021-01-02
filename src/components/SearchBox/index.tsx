import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import AsyncSelect from 'react-select/async';

import './style.scss';

const fetchData = async (inputValue) => {
  const provider = new OpenStreetMapProvider();

  const results = await provider.search({ query: inputValue });
  return results.map(({ label }) => label);
};

// eslint-disable-next-line arrow-body-style
const loadOptions = (inputValue) => {
  // console.log('inputValue', inputValue);
  // callback(fetchData(inputValue));
  return new Promise((resolve) => {
    resolve(fetchData(inputValue));
  });
};

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [addresses, setAddresses] = useState([]);
  // const [provider] = useState(new OpenStreetMapProvider());

  const handleInputChange = (value) => {
    const newValue = value.replace(/\W/g, '');
    setQuery(newValue);
    return newValue;
  };

  return (
    <div className='search-box'>
      <AsyncSelect
        className='async-select'
        classNamePrefix='async-select'
        loadOptions={loadOptions}
        defaultOptions={[]}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;
