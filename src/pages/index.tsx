import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import SuperclusterContextProvider from '@/context/SuperclusterContext';
import Layout from '../components/Layout';
import '../styles/style.scss';

const Home = () => {
  const [map, setMap] = useState(null);

  const MapWithoutSSR = React.useMemo(
    () =>
      dynamic(() => import('@components/Map'), {
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
        <MapWithoutSSR map={map} setMap={setMap}>
          <MarkersWithoutSSR map={map} />
        </MapWithoutSSR>
      </SuperclusterContextProvider>
    </Layout>
  );
};

export default Home;
