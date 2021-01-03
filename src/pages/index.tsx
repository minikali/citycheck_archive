import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import SuperclusterContextProvider from '@/context/SuperclusterContext';
import Layout from '../components/Layout';
import '../styles/style.scss';

const Home = () => {
  const [map, setMap] = useState(null);
  const [addr, setAddr] = useState();
  const mapRef = useRef(null);
  const { t } = useTranslation();

  const handleAddr = (v) => {
    setAddr(v);
    if (v) {
      map.fitBounds(v.bounds);
    }
  };

  const handleSearchboxFocus = () => {
    window.scrollTo(0, mapRef.current.offsetTop - 10);
  };

  const MapWithoutSSR = React.useMemo(
    () =>
      dynamic(() => import('@components/Map'), {
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    []
  );
  const SearchBoxWithoutSSR = React.useMemo(
    () =>
      dynamic(() => import('@components/SearchBox'), {
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    []
  );
  const MarkersWithoutSSR = React.useMemo(
    () =>
      dynamic(() => import('@components/Markers'), {
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    []
  );
  return (
    <Layout>
      <SuperclusterContextProvider>
        <div ref={mapRef} className='home'>
          <SearchBoxWithoutSSR
            addr={addr}
            setAddr={handleAddr}
            onFocus={handleSearchboxFocus}
            placeholder={t('enter_address')}
          />
          <MapWithoutSSR setMap={setMap}>
            <MarkersWithoutSSR map={map} />
          </MapWithoutSSR>
        </div>
      </SuperclusterContextProvider>
    </Layout>
  );
};

export default Home;
