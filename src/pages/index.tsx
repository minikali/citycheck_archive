import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

import '../styles/style.scss';

const Home = () => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import('@components/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    [
      /* list variables which should trigger a re-render here */
    ]
  );
  return (
    <Layout>
      <Map />
    </Layout>
  );
};

export default Home;
