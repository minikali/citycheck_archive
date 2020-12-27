import React from 'react';
import dynamic from 'next/dynamic';
import SuperclusterContextProvider from '@/context/SuperclusterContext';
import Layout from '../components/Layout';
import '../styles/style.scss';

const Home = () => {
  const MapWithoutSSR = React.useMemo(
    () =>
      dynamic(() => import('@components/Map'), {
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    [
      /* list variables which should trigger a re-render here */
    ]
  );
  return (
    <Layout>
      <SuperclusterContextProvider>
        <MapWithoutSSR />
      </SuperclusterContextProvider>
    </Layout>
  );
};

export default Home;
